import { Page, Request } from '@playwright/test';
import { WEB3FORMS_ENDPOINT, TARGET_RECIPIENT_EMAIL } from './selectors';

export interface Web3FormsPayload {
  access_key?: string;
  to_email?: string;
  subject?: string;
  from_name?: string;
  website?: string;
  practice_area?: string;
  firm_size?: string;
  role?: string;
  email?: string;
  [key: string]: unknown;
}

export interface MockWeb3FormsOptions {
  status?: number;
  responseBody?: Record<string, unknown>;
  delayMs?: number;
  abort?: boolean;
  onIntercept?: (payload: Web3FormsPayload, req: Request) => void;
}

export class Web3FormsMock {
  public interceptedPayloads: Web3FormsPayload[] = [];
  public interceptedRequests: Request[] = [];

  constructor(private page: Page) {}

  /**
   * Sets up the route handler for https://api.web3forms.com/submit
   */
  async setup(options: MockWeb3FormsOptions = {}) {
    const status = options.status ?? 200;
    const responseBody = options.responseBody ?? {
      success: status >= 200 && status < 300,
      message: status === 200 ? 'Submission successful' : 'Submission failed',
    };

    await this.page.route(WEB3FORMS_ENDPOINT, async (route, req) => {
      if (options.abort) {
        await route.abort('failed');
        return;
      }

      if (options.delayMs && options.delayMs > 0) {
        await new Promise((resolve) => setTimeout(resolve, options.delayMs));
      }

      let payload: Web3FormsPayload = {};
      try {
        const postData = req.postData();
        if (postData) {
          payload = JSON.parse(postData);
        }
      } catch {
        payload = {};
      }

      this.interceptedPayloads.push(payload);
      this.interceptedRequests.push(req);

      if (options.onIntercept) {
        options.onIntercept(payload, req);
      }

      await route.fulfill({
        status,
        contentType: 'application/json',
        body: JSON.stringify(responseBody),
      });
    });
  }

  /**
   * Helper to verify target recipient email contract
   */
  verifyRecipientEmail(expectedEmail: string = TARGET_RECIPIENT_EMAIL): boolean {
    if (this.interceptedPayloads.length === 0) return false;
    return this.interceptedPayloads.every(
      (payload) => payload.to_email === expectedEmail
    );
  }

  /**
   * Clears captured requests
   */
  reset() {
    this.interceptedPayloads = [];
    this.interceptedRequests = [];
  }
}

/**
 * Functional helper to quickly mount Web3Forms mock
 */
export async function setupWeb3FormsMock(
  page: Page,
  options: MockWeb3FormsOptions = {}
): Promise<Web3FormsMock> {
  const mock = new Web3FormsMock(page);
  await mock.setup(options);
  return mock;
}

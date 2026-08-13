import { Page, Locator, expect } from '@playwright/test';

/**
 * Scroll and Framer-Motion Animation Testing Helper
 */
export class ScrollHelper {
  constructor(private page: Page) {}

  /**
   * Scroll element into center view to trigger framer-motion whileInView animations
   */
  async scrollToElement(selectorOrLocator: string | Locator): Promise<void> {
    const locator =
      typeof selectorOrLocator === 'string'
        ? this.page.locator(selectorOrLocator).first()
        : selectorOrLocator.first();

    await locator.scrollIntoViewIfNeeded();
    // Allow framer-motion transition frames to process
    await this.page.waitForTimeout(300);
  }

  /**
   * Scroll down the page in steps to trigger staggered scroll animations across all 6 sections
   */
  async scrollThroughAllSections(): Promise<void> {
    const sectionSelectors = [
      '[data-testid="section-custom-ai-infrastructure"], [data-testid="section-hero"], #custom-ai-infrastructure',
      '[data-testid="section-win-more-business"], [data-testid="section-win-business"], #win-more-business',
      '[data-testid="section-best-legal-work"], [data-testid="section-legal-work"], #best-legal-work',
      '[data-testid="section-sync-employee-devices"], [data-testid="section-sync-devices"], #sync-employee-devices',
      '[data-testid="section-run-firm-without-busywork"], [data-testid="section-busywork"], #run-firm-without-busywork',
      '[data-testid="section-and-much-more"], [data-testid="section-much-more"], #and-much-more',
      '[data-testid="lead-capture-form"], #lead-form',
    ];

    for (const selector of sectionSelectors) {
      const locator = this.page.locator(selector).first();
      if ((await locator.count()) > 0) {
        await locator.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(200);
      }
    }
  }

  /**
   * Scroll directly to the bottom of the page (to the Lead Capture form)
   */
  async scrollToBottom(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.page.waitForTimeout(300);
  }

  /**
   * Scroll directly to top of the page
   */
  async scrollToTop(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, 0));
    await this.page.waitForTimeout(300);
  }

  /**
   * Assert that framer-motion animated element has rendered and is visible
   */
  async assertMotionElementVisible(locator: Locator, timeout = 5000): Promise<void> {
    await expect(locator).toBeVisible({ timeout });
  }
}

export function createScrollHelper(page: Page): ScrollHelper {
  return new ScrollHelper(page);
}

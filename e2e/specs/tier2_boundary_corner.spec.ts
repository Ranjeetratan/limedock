import { test, expect } from '../harness/test.fixture';
import { LawFirmsSelectors, setupWeb3FormsMock } from '../harness/selectors';

test.describe('Tier 2: Boundary & Corner Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/law-firms');
  });

  test('T2.1: Submitting empty form prevents submission and triggers browser HTML5 or custom validation', async ({
    page,
    web3formsMock,
    scrollHelper,
  }) => {
    await scrollHelper.scrollToBottom();

    const submitBtn = page.locator(LawFirmsSelectors.form.buttonSubmit).first();
    const inputEmail = page.locator(LawFirmsSelectors.form.inputEmail).first();

    // Click submit without entering required email or options
    await submitBtn.click();

    // Email field should be marked invalid or form prevented from dispatching HTTP call
    const isInvalid = await inputEmail.evaluate(
      (el: HTMLInputElement) => !el.checkValidity()
    );
    expect(isInvalid).toBe(true);

    // Assert zero HTTP network requests dispatched
    expect(web3formsMock.interceptedRequests.length).toBe(0);
  });

  test('T2.2: Malformed email input prevents submission', async ({
    page,
    web3formsMock,
    scrollHelper,
  }) => {
    await scrollHelper.scrollToBottom();

    const inputEmail = page.locator(LawFirmsSelectors.form.inputEmail).first();
    const submitBtn = page.locator(LawFirmsSelectors.form.buttonSubmit).first();

    // Fill malformed email formats
    const malformedEmails = ['not-an-email', 'attorney@', '@firm.com', 'user@domain..com'];

    for (const invalidEmail of malformedEmails) {
      await inputEmail.fill(invalidEmail);
      await submitBtn.click();

      const isInvalid = await inputEmail.evaluate(
        (el: HTMLInputElement) => !el.checkValidity()
      );
      expect(isInvalid).toBe(true);
    }

    expect(web3formsMock.interceptedRequests.length).toBe(0);
  });

  test('T2.3: Handling HTTP 500 server error gracefully without application crash', async ({
    page,
    scrollHelper,
  }) => {
    // Intercept Web3Forms and return 500 error
    await setupWeb3FormsMock(page, {
      status: 500,
      responseBody: { success: false, message: 'Internal Server Error' },
    });

    await scrollHelper.scrollToBottom();

    const inputWebsite = page.locator(LawFirmsSelectors.form.inputCompanyWebsite).first();
    const selectPractice = page.locator(LawFirmsSelectors.form.selectAreaOfPractice).first();
    const selectSize = page.locator(LawFirmsSelectors.form.selectFirmSize).first();
    const selectRole = page.locator(LawFirmsSelectors.form.selectRole).first();
    const inputEmail = page.locator(LawFirmsSelectors.form.inputEmail).first();
    const submitBtn = page.locator(LawFirmsSelectors.form.buttonSubmit).first();

    await inputWebsite.fill('https://testfirm.com');
    await selectPractice.selectOption({ index: 1 });
    await selectSize.selectOption({ index: 1 });
    await selectRole.selectOption({ index: 1 });
    await inputEmail.fill('partner@testfirm.com');

    await submitBtn.click();

    await page.waitForTimeout(500);

    // App should not crash or throw unhandled boundary errors
    const form = page.locator(LawFirmsSelectors.form.container).first();
    await expect(form).toBeVisible();

    // Verify error feedback container or button re-enabled state
    const errorMessage = page.locator(LawFirmsSelectors.form.errorMessage);
    if ((await errorMessage.count()) > 0) {
      await expect(errorMessage.first()).toBeVisible();
    }
  });

  test('T2.4: Handling HTTP 400 Bad Request error gracefully', async ({
    page,
    scrollHelper,
  }) => {
    await setupWeb3FormsMock(page, {
      status: 400,
      responseBody: { success: false, message: 'Bad Request - Invalid Key or Field' },
    });

    await scrollHelper.scrollToBottom();

    const inputEmail = page.locator(LawFirmsSelectors.form.inputEmail).first();
    const submitBtn = page.locator(LawFirmsSelectors.form.buttonSubmit).first();

    await inputEmail.fill('valid@lawfirm.com');
    await submitBtn.click();

    await page.waitForTimeout(500);

    // UI remains responsive and submit button re-enabled for user retry
    await expect(submitBtn).toBeEnabled();
  });

  test('T2.5: Handling network abort / connection timeout scenario', async ({
    page,
    scrollHelper,
  }) => {
    await setupWeb3FormsMock(page, {
      abort: true,
    });

    await scrollHelper.scrollToBottom();

    const inputEmail = page.locator(LawFirmsSelectors.form.inputEmail).first();
    const submitBtn = page.locator(LawFirmsSelectors.form.buttonSubmit).first();

    await inputEmail.fill('timeout@lawfirm.com');
    await submitBtn.click();

    await page.waitForTimeout(500);

    // Ensure form input values are preserved after network drop
    await expect(inputEmail).toHaveValue('timeout@lawfirm.com');
  });

  test('T2.6: Rapid double-click protection prevents duplicate submission requests', async ({
    page,
    web3formsMock,
    scrollHelper,
  }) => {
    // Add artificial delay to API mock to simulate network latency
    await web3formsMock.setup({
      delayMs: 400,
      status: 200,
    });

    await scrollHelper.scrollToBottom();

    const inputEmail = page.locator(LawFirmsSelectors.form.inputEmail).first();
    const submitBtn = page.locator(LawFirmsSelectors.form.buttonSubmit).first();

    await inputEmail.fill('rapid@lawfirm.com');

    // Rapid double click on submit button
    await submitBtn.click();
    await submitBtn.click().catch(() => {}); // catch if button is disabled on 2nd click

    await page.waitForTimeout(800);

    // Verify only 1 network POST call was dispatched during loading state
    expect(web3formsMock.interceptedRequests.length).toBe(1);
  });
});

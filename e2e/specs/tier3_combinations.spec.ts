import { test, expect } from '../harness/test.fixture';
import { LawFirmsSelectors, TARGET_RECIPIENT_EMAIL } from '../harness/selectors';

test.describe('Tier 3: Cross-Feature Combinations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/law-firms');
  });

  test('T3.1: Multi-field option selection matrix 1 (Enterprise / Managing Partner / Intellectual Property)', async ({
    page,
    web3formsMock,
    scrollHelper,
  }) => {
    await scrollHelper.scrollToBottom();

    const inputWebsite = page.locator(LawFirmsSelectors.form.inputCompanyWebsite).first();
    const selectPractice = page.locator(LawFirmsSelectors.form.selectAreaOfPractice).first();
    const selectSize = page.locator(LawFirmsSelectors.form.selectFirmSize).first();
    const selectRole = page.locator(LawFirmsSelectors.form.selectRole).first();
    const inputEmail = page.locator(LawFirmsSelectors.form.inputEmail).first();
    const submitBtn = page.locator(LawFirmsSelectors.form.buttonSubmit).first();

    await inputWebsite.fill('https://globalip-law.com');
    await selectPractice.selectOption({ label: /Intellectual Property|IP/i });
    await selectSize.selectOption({ label: /Enterprise/i });
    await selectRole.selectOption({ label: /Managing Partner/i });
    await inputEmail.fill('managing.partner@globalip-law.com');

    await submitBtn.click();
    await page.waitForTimeout(500);

    expect(web3formsMock.interceptedRequests.length).toBe(1);
    const payload = web3formsMock.interceptedPayloads[0];
    expect(payload.website).toBe('https://globalip-law.com');
    expect(payload.firm_size).toMatch(/Enterprise/i);
    expect(payload.role).toMatch(/Managing Partner/i);
    expect(payload.to_email).toBe(TARGET_RECIPIENT_EMAIL);
  });

  test('T3.2: Multi-field option selection matrix 2 (Solo / Solo Lawyer / Criminal Defense)', async ({
    page,
    web3formsMock,
    scrollHelper,
  }) => {
    await scrollHelper.scrollToBottom();

    const inputWebsite = page.locator(LawFirmsSelectors.form.inputCompanyWebsite).first();
    const selectPractice = page.locator(LawFirmsSelectors.form.selectAreaOfPractice).first();
    const selectSize = page.locator(LawFirmsSelectors.form.selectFirmSize).first();
    const selectRole = page.locator(LawFirmsSelectors.form.selectRole).first();
    const inputEmail = page.locator(LawFirmsSelectors.form.inputEmail).first();
    const submitBtn = page.locator(LawFirmsSelectors.form.buttonSubmit).first();

    await inputWebsite.fill('https://solodefense.com');
    await selectPractice.selectOption({ label: /Criminal Defense/i });
    await selectSize.selectOption({ label: /Solo/i });
    await selectRole.selectOption({ label: /Solo Lawyer/i });
    await inputEmail.fill('counsel@solodefense.com');

    await submitBtn.click();
    await page.waitForTimeout(500);

    expect(web3formsMock.interceptedRequests.length).toBe(1);
    const payload = web3formsMock.interceptedPayloads[0];
    expect(payload.firm_size).toMatch(/Solo/i);
    expect(payload.role).toMatch(/Solo Lawyer/i);
  });

  test('T3.3: Scroll state interaction with lead capture form responsiveness', async ({
    page,
    scrollHelper,
  }) => {
    // Scroll down to Section 1 -> Section 3 -> Section 6 -> Lead Form
    await scrollHelper.scrollToElement(LawFirmsSelectors.sections.customAiInfrastructure);
    await scrollHelper.scrollToElement(LawFirmsSelectors.sections.bestLegalWork);
    await scrollHelper.scrollToElement(LawFirmsSelectors.sections.andMuchMore);
    await scrollHelper.scrollToBottom();

    // Verify form elements are interactive and responsive after scroll events
    const inputEmail = page.locator(LawFirmsSelectors.form.inputEmail).first();
    await inputEmail.focus();
    await inputEmail.fill('scroll-test@firm.com');
    await expect(inputEmail).toHaveValue('scroll-test@firm.com');
  });

  test('T3.4: Error recovery and form re-submission flow', async ({
    page,
    web3formsMock,
    scrollHelper,
  }) => {
    await scrollHelper.scrollToBottom();

    const inputEmail = page.locator(LawFirmsSelectors.form.inputEmail).first();
    const submitBtn = page.locator(LawFirmsSelectors.form.buttonSubmit).first();

    // Step 1: Fill invalid email -> trigger native check
    await inputEmail.fill('invalid-email-string');
    await submitBtn.click();

    expect(web3formsMock.interceptedRequests.length).toBe(0);

    // Step 2: Correct email -> click submit -> verify success payload sent
    await inputEmail.fill('corrected@validlawyer.com');
    await submitBtn.click();
    await page.waitForTimeout(500);

    expect(web3formsMock.interceptedRequests.length).toBe(1);
    expect(web3formsMock.interceptedPayloads[0].email).toBe('corrected@validlawyer.com');
  });
});

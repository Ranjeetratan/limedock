import { test, expect } from '../harness/test.fixture';
import { LawFirmsSelectors, TARGET_RECIPIENT_EMAIL } from '../harness/selectors';

test.describe('Tier 4: Real-World End-to-End Scenarios', () => {
  test('T4.1: Complete End-to-End User Lead Submission Journey', async ({
    page,
    web3formsMock,
    scrollHelper,
  }) => {
    // Step 1: User arrives at /law-firms landing page
    await page.goto('/law-firms');

    // Verify metadata & page title
    await expect(page).toHaveTitle(/Law Firm/i);

    // Step 2: User scrolls sequentially through the 6 landing page sections
    await scrollHelper.scrollToElement(LawFirmsSelectors.sections.customAiInfrastructure);
    await expect(page.getByText('A Custom AI Infrastructure for your firm').first()).toBeVisible();

    await scrollHelper.scrollToElement(LawFirmsSelectors.sections.winMoreBusiness);
    await expect(page.getByText('That Helps you to Win More of the Right Business').first()).toBeVisible();

    await scrollHelper.scrollToElement(LawFirmsSelectors.sections.bestLegalWork);
    await expect(page.getByText('Do your best legal work').first()).toBeVisible();

    await scrollHelper.scrollToElement(LawFirmsSelectors.sections.syncEmployeeDevices);
    await expect(page.getByText('Sync all your Employee Devices').first()).toBeVisible();

    await scrollHelper.scrollToElement(LawFirmsSelectors.sections.runFirmWithoutBusywork);
    await expect(page.getByText('Run the Firm Without the Busywork').first()).toBeVisible();

    await scrollHelper.scrollToElement(LawFirmsSelectors.sections.andMuchMore);
    await expect(page.getByText('And Much More').first()).toBeVisible();

    // Step 3: User reaches the Lead Capture Form section
    await scrollHelper.scrollToBottom();

    const formContainer = page.locator(LawFirmsSelectors.form.container).first();
    await expect(formContainer).toBeVisible();

    // Step 4: User fills out all 5 lead capture fields
    const inputWebsite = page.locator(LawFirmsSelectors.form.inputCompanyWebsite).first();
    const selectPractice = page.locator(LawFirmsSelectors.form.selectAreaOfPractice).first();
    const selectSize = page.locator(LawFirmsSelectors.form.selectFirmSize).first();
    const selectRole = page.locator(LawFirmsSelectors.form.selectRole).first();
    const inputEmail = page.locator(LawFirmsSelectors.form.inputEmail).first();
    const submitBtn = page.locator(LawFirmsSelectors.form.buttonSubmit).first();

    await inputWebsite.fill('https://vanguardlegal.com');
    await selectPractice.selectOption({ index: 1 });
    await selectSize.selectOption({ index: 3 }); // Mid-Sized or Enterprise
    await selectRole.selectOption({ index: 5 }); // Managing Partner / Paralegal
    await inputEmail.fill('partner@vanguardlegal.com');

    // Step 5: User clicks "Get Customized Workflow" submit button
    await submitBtn.click();
    await page.waitForTimeout(500);

    // Step 6: Verify network call was dispatched to Web3Forms API
    expect(web3formsMock.interceptedRequests.length).toBe(1);

    // Step 7: Verify payload data matches submitted form values and recipient contract
    const payload = web3formsMock.interceptedPayloads[0];
    expect(payload).toBeDefined();
    expect(payload.to_email).toBe(TARGET_RECIPIENT_EMAIL);
    expect(payload.website).toBe('https://vanguardlegal.com');
    expect(payload.email).toBe('partner@vanguardlegal.com');
    expect(payload.practice_area).toBeDefined();
    expect(payload.firm_size).toBeDefined();
    expect(payload.role).toBeDefined();
  });
});

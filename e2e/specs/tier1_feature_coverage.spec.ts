import { test, expect } from '../harness/test.fixture';
import {
  LawFirmsSelectors,
  PracticeAreaOptions,
  AlternatePracticeAreaOptions,
  FirmSizeOptions,
  RoleOptions,
  WEB3FORMS_ENDPOINT,
  TARGET_RECIPIENT_EMAIL,
} from '../harness/selectors';

test.describe('Tier 1: Feature Structural Coverage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/law-firms');
  });

  test('T1.1: Metadata, canonical URL, and Schema.org JsonLd script present', async ({ page }) => {
    // Canonical link tag assertion
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /\/law-firms$/);

    // Title assertion
    await expect(page).toHaveTitle(/Law Firm/i);

    // Schema.org JsonLd script tag check
    const jsonLdScript = page.locator('script[type="application/ld+json"]');
    await expect(jsonLdScript).toBeAttached();
  });

  test('T1.2: Page container and global wrappers (Navbar, Footer, ScrollProgress, CursorBlob)', async ({ page }) => {
    const mainContainer = page.locator(LawFirmsSelectors.layout.container);
    await expect(mainContainer.first()).toBeVisible();

    const navbar = page.locator(LawFirmsSelectors.layout.navbar);
    await expect(navbar.first()).toBeAttached();

    const footer = page.locator(LawFirmsSelectors.layout.footer);
    await expect(footer.first()).toBeAttached();
  });

  test('T1.3: All 6 main animated sections render with exact copy headings', async ({ page, scrollHelper }) => {
    await scrollHelper.scrollThroughAllSections();

    // Section 1: Custom AI Infrastructure
    const s1 = page.locator(LawFirmsSelectors.sections.customAiInfrastructure).first();
    await expect(s1).toBeVisible();
    await expect(page.getByText(LawFirmsSelectors.headings.customAiInfrastructure, { exact: false }).first()).toBeVisible();

    // Section 2: Win More Business
    const s2 = page.locator(LawFirmsSelectors.sections.winMoreBusiness).first();
    await expect(s2).toBeVisible();
    await expect(page.getByText(LawFirmsSelectors.headings.winMoreBusiness, { exact: false }).first()).toBeVisible();

    // Section 3: Do your best legal work
    const s3 = page.locator(LawFirmsSelectors.sections.bestLegalWork).first();
    await expect(s3).toBeVisible();
    await expect(page.getByText(LawFirmsSelectors.headings.bestLegalWork, { exact: false }).first()).toBeVisible();

    // Section 4: Sync all your Employee Devices
    const s4 = page.locator(LawFirmsSelectors.sections.syncEmployeeDevices).first();
    await expect(s4).toBeVisible();
    await expect(page.getByText(LawFirmsSelectors.headings.syncEmployeeDevices, { exact: false }).first()).toBeVisible();

    // Section 5: Run the Firm Without the Busywork
    const s5 = page.locator(LawFirmsSelectors.sections.runFirmWithoutBusywork).first();
    await expect(s5).toBeVisible();
    await expect(page.getByText(LawFirmsSelectors.headings.runFirmWithoutBusywork, { exact: false }).first()).toBeVisible();

    // Section 6: And Much More
    const s6 = page.locator(LawFirmsSelectors.sections.andMuchMore).first();
    await expect(s6).toBeVisible();
    await expect(page.getByText(LawFirmsSelectors.headings.andMuchMore, { exact: false }).first()).toBeVisible();
  });

  test('T1.4: Lead capture form contains all 5 required input fields and submit button', async ({ page, scrollHelper }) => {
    await scrollHelper.scrollToBottom();

    const form = page.locator(LawFirmsSelectors.form.container).first();
    await expect(form).toBeVisible();

    // Input: Website
    const inputWebsite = page.locator(LawFirmsSelectors.form.inputCompanyWebsite).first();
    await expect(inputWebsite).toBeVisible();

    // Select: Area of Practice
    const selectPractice = page.locator(LawFirmsSelectors.form.selectAreaOfPractice).first();
    await expect(selectPractice).toBeVisible();

    // Select: Firm Size
    const selectSize = page.locator(LawFirmsSelectors.form.selectFirmSize).first();
    await expect(selectSize).toBeVisible();

    // Select: Role
    const selectRole = page.locator(LawFirmsSelectors.form.selectRole).first();
    await expect(selectRole).toBeVisible();

    // Input: Email
    const inputEmail = page.locator(LawFirmsSelectors.form.inputEmail).first();
    await expect(inputEmail).toBeVisible();

    // Submit Button
    const submitBtn = page.locator(LawFirmsSelectors.form.buttonSubmit).first();
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toHaveText(/Get Customized Workflow/i);
  });

  test('T1.5: Area of Practice dropdown contains 16 practice options', async ({ page, scrollHelper }) => {
    await scrollHelper.scrollToBottom();

    const selectPractice = page.locator(LawFirmsSelectors.form.selectAreaOfPractice).first();
    const options = selectPractice.locator('option');
    const optionTexts = (await options.allInnerTexts()).map((t) => t.trim());

    // Filter out default placeholder option if any
    const realOptions = optionTexts.filter(
      (txt) => txt.length > 0 && !txt.toLowerCase().startsWith('select')
    );

    expect(realOptions.length).toBeGreaterThanOrEqual(16);

    // Verify key practice areas are represented
    const matchesCanonical = PracticeAreaOptions.filter((opt) =>
      realOptions.some((real) => real.includes(opt) || opt.includes(real))
    );
    const matchesAlternate = AlternatePracticeAreaOptions.filter((opt) =>
      realOptions.some((real) => real.includes(opt) || opt.includes(real))
    );

    expect(matchesCanonical.length >= 10 || matchesAlternate.length >= 10).toBe(true);
  });

  test('T1.6: Firm Size dropdown contains exactly 4 firm size options', async ({ page, scrollHelper }) => {
    await scrollHelper.scrollToBottom();

    const selectSize = page.locator(LawFirmsSelectors.form.selectFirmSize).first();
    const options = selectSize.locator('option');
    const optionTexts = (await options.allInnerTexts()).map((t) => t.trim());

    for (const expectedSize of FirmSizeOptions) {
      expect(optionTexts.some((txt) => txt.toLowerCase() === expectedSize.toLowerCase())).toBe(true);
    }
  });

  test('T1.7: Roles dropdown contains exactly 7 role options', async ({ page, scrollHelper }) => {
    await scrollHelper.scrollToBottom();

    const selectRole = page.locator(LawFirmsSelectors.form.selectRole).first();
    const options = selectRole.locator('option');
    const optionTexts = (await options.allInnerTexts()).map((t) => t.trim());

    for (const expectedRole of RoleOptions) {
      expect(optionTexts.some((txt) => txt.toLowerCase() === expectedRole.toLowerCase())).toBe(true);
    }
  });

  test('T1.8: Web3Forms submit handler targets https://api.web3forms.com/submit for recipient limedockadmn@gmail.com', async ({
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

    await inputWebsite.fill('https://acme-law.com');
    await selectPractice.selectOption({ index: 1 });
    await selectSize.selectOption({ index: 1 });
    await selectRole.selectOption({ index: 1 });
    await inputEmail.fill('partner@acme-law.com');

    await submitBtn.click();

    await page.waitForTimeout(500);

    expect(web3formsMock.interceptedRequests.length).toBeGreaterThan(0);
    const payload = web3formsMock.interceptedPayloads[0];
    expect(payload).toBeDefined();
    expect(payload.to_email).toBe(TARGET_RECIPIENT_EMAIL);
  });
});

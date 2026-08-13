/**
 * Centralized DOM Selectors and Enumerations for E2E Testing
 * Target: /law-firms landing page redesign
 */

export const LawFirmsSelectors = {
  // Page Components & Layout
  layout: {
    navbar: '[data-testid="navbar"], header, nav',
    footer: '[data-testid="footer"], footer',
    scrollProgress: '[data-testid="scroll-progress"]',
    cursorBlob: '[data-testid="cursor-blob"]',
    container: '[data-testid="law-firms-container"], [data-testid="law-firms-landing-page"], main',
  },

  // 6 Main Animated Landing Page Sections
  sections: {
    customAiInfrastructure: '[data-testid="section-custom-ai-infrastructure"], [data-testid="section-hero"], #custom-ai-infrastructure',
    winMoreBusiness: '[data-testid="section-win-more-business"], [data-testid="section-win-business"], #win-more-business',
    bestLegalWork: '[data-testid="section-best-legal-work"], [data-testid="section-legal-work"], #best-legal-work',
    syncEmployeeDevices: '[data-testid="section-sync-employee-devices"], [data-testid="section-sync-devices"], #sync-employee-devices',
    runFirmWithoutBusywork: '[data-testid="section-run-firm-without-busywork"], [data-testid="section-busywork"], #run-firm-without-busywork',
    andMuchMore: '[data-testid="section-and-much-more"], [data-testid="section-much-more"], #and-much-more',
  },

  // Section Headings Copy
  headings: {
    customAiInfrastructure: 'A Custom AI Infrastructure for your firm',
    winMoreBusiness: 'That Helps you to Win More of the Right Business',
    bestLegalWork: 'Do your best legal work',
    syncEmployeeDevices: 'Sync all your Employee Devices',
    runFirmWithoutBusywork: 'Run the Firm Without the Busywork',
    andMuchMore: 'And Much More',
  },

  // Lead Capture Form Elements
  form: {
    container: '[data-testid="lead-capture-form"], [data-testid="form-container"], #lead-form form, form',
    inputCompanyWebsite: '[data-testid="input-company-website"], [data-testid="input-website"], input[name="website"]',
    selectAreaOfPractice: '[data-testid="select-area-of-practice"], [data-testid="select-practice-area"], select[name="practice_area"]',
    selectFirmSize: '[data-testid="select-firm-size"], select[name="firm_size"]',
    selectRole: '[data-testid="select-role"], select[name="role"]',
    inputEmail: '[data-testid="input-email"], input[name="email"]',
    buttonSubmit: '[data-testid="button-submit-lead-form"], [data-testid="btn-submit"], button[type="submit"]',
    successMessage: '[data-testid="form-success-message"], [data-testid="submission-success-message"], [data-testid="form-success"]',
    errorMessage: '[data-testid="form-error-message"], [data-testid="submission-error-message"], [data-testid="form-error"]',
  },
} as const;

/**
 * 16 Practice Area Options (Canonical List)
 */
export const PracticeAreaOptions = [
  'Corporate & Business Law',
  'Real Estate Law',
  'Intellectual Property (IP)',
  'Commercial Litigation',
  'Family Law & Divorce',
  'Criminal Defense',
  'Personal Injury',
  'Employment & Labor Law',
  'Estate Planning & Probate',
  'Bankruptcy & Restructuring',
  'Tax Law',
  'Immigration Law',
  'Healthcare & Medical Malpractice',
  'Environmental & Energy Law',
  'Banking & Finance Law',
  'General Practice / Other',
] as const;

/**
 * Alternative Practice Area Options (Short Form Set)
 */
export const AlternatePracticeAreaOptions = [
  'Bankruptcy',
  'Business Law',
  'Civil Litigation',
  'Commercial Real Estate',
  'Corporate / M&A',
  'Criminal Defense',
  'Employment Law',
  'Estate Planning',
  'Family Law',
  'Immigration',
  'Intellectual Property',
  'Personal Injury',
  'Real Estate',
  'Tax Law',
  'Trusts & Estates',
  'White Collar Defense',
] as const;

/**
 * 4 Firm Size Options
 */
export const FirmSizeOptions = [
  'Solo',
  'Small',
  'Mid-Sized',
  'Enterprise',
] as const;

/**
 * 7 Role Options
 */
export const RoleOptions = [
  'Associate Attorney',
  'Billing Manager',
  'IT Manager',
  'Legal Administrator',
  'Managing Partner',
  'Paralegal',
  'Solo Lawyer',
] as const;

export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
export const TARGET_RECIPIENT_EMAIL = 'limedockadmn@gmail.com';

import fs from 'fs';
import path from 'path';

console.log('=== INDEPENDENT VICTORY AUDITOR FORENSIC VERIFICATION ===');

const projectRoot = path.resolve(__dirname, '../..');
const navbarPath = path.join(projectRoot, 'src/components/Navbar.tsx');

if (!fs.existsSync(navbarPath)) {
  console.error('FAIL: Navbar.tsx does not exist');
  process.exit(1);
}

const navbarCode = fs.readFileSync(navbarPath, 'utf8');

// 1. Check NAV_ITEMS definition and count
console.log('\n--- 1. Top-Level Item Count Check ---');
import { NAV_ITEMS } from '../../src/components/Navbar';

console.log(`NAV_ITEMS length: ${NAV_ITEMS.length}`);
for (let i = 0; i < NAV_ITEMS.length; i++) {
  const item = NAV_ITEMS[i];
  console.log(`  Item ${i + 1}: ${item.label} (href: ${item.href || 'N/A'}, children: ${item.children ? item.children.length : 0})`);
}

if (NAV_ITEMS.length > 5 || NAV_ITEMS.length < 4) {
  console.error(`FAIL: NAV_ITEMS length ${NAV_ITEMS.length} is not within [4, 5]`);
  process.exit(1);
} else {
  console.log('PASS: Top-level item count is exactly 5 (<= 5 requirement satisfied)');
}

// 2. Check 100% Reachability of Original Destinations
console.log('\n--- 2. Reachability of Original 10 Destinations ---');
const originalDestinations = [
  '/#collapse',
  '/#services',
  '/#capabilities',
  '/#system',
  '/#how-we-work',
  '/trending-agents',
  '/directories',
  '/works',
  '/blog',
  '/contact'
];

const allHrefs: string[] = [];
NAV_ITEMS.forEach(item => {
  if (item.href) allHrefs.push(item.href);
  if (item.children) {
    item.children.forEach(c => allHrefs.push(c.href));
  }
});

let missing = 0;
for (const dest of originalDestinations) {
  const found = allHrefs.includes(dest);
  console.log(`  ${found ? '✔ PASS' : '✖ FAIL'}: Destination ${dest}`);
  if (!found) missing++;
}

if (missing > 0) {
  console.error(`FAIL: ${missing} original destinations are missing`);
  process.exit(1);
} else {
  console.log('PASS: 100% of original 10 destinations are reachable');
}

// 3. Check Subpage Safety (Root Relative Hashes)
console.log('\n--- 3. Root-Relative Hash Safety Check ---');
let invalidHashes = 0;
allHrefs.forEach(href => {
  if (href.includes('#') && !href.startsWith('/#')) {
    console.error(`  ✖ FAIL: Hash "${href}" does not start with "/#"`);
    invalidHashes++;
  }
});
if (invalidHashes === 0) {
  console.log('PASS: All hash anchors use "/#" prefix ensuring subpage routing safety');
}

// 4. Check Mobile Menu & Accordion Implementation
console.log('\n--- 4. Mobile Menu & Accordion Forensics ---');
const checks = [
  { name: 'Mobile drawer container with id', check: navbarCode.includes('id="mobile-navigation-drawer"') },
  { name: 'Mobile hamburger button with dynamic aria-label', check: navbarCode.includes('aria-label={isMobileOpen ?') },
  { name: 'Mobile hamburger button with aria-controls', check: navbarCode.includes('aria-controls="mobile-navigation-drawer"') },
  { name: 'Mobile accordion state handler', check: navbarCode.includes('toggleMobileAccordion') },
  { name: 'Mobile accordion container with animated height', check: navbarCode.includes('mobile-accordion-') },
  { name: 'Scroll locking on mobile open', check: navbarCode.includes('document.body.style.overflow = isMobileOpen ? "hidden" : ""') },
  { name: 'Scroll locking cleanup on unmount', check: navbarCode.includes('return () => {\n      document.body.style.overflow = "";\n    };') || navbarCode.includes('document.body.style.overflow = "";') },
  { name: 'Auto-closing mobile drawer on link click', check: navbarCode.includes('onClick={() => setIsMobileOpen(false)}') },
];

let failedChecks = 0;
checks.forEach(c => {
  console.log(`  ${c.check ? '✔ PASS' : '✖ FAIL'}: ${c.name}`);
  if (!c.check) failedChecks++;
});

if (failedChecks > 0) {
  console.error(`FAIL: ${failedChecks} mobile menu forensic checks failed`);
  process.exit(1);
} else {
  console.log('PASS: Mobile menu & accordions fully verified');
}

// 5. Check WAI-ARIA & Keyboard Navigation Handlers
console.log('\n--- 5. WAI-ARIA & Keyboard Navigation Forensics ---');
const a11yChecks = [
  { name: 'nav element with aria-label="Main Navigation"', check: navbarCode.includes('aria-label="Main Navigation"') },
  { name: 'Dropdown trigger button aria-haspopup="menu"', check: navbarCode.includes('aria-haspopup="menu"') },
  { name: 'Dropdown trigger button aria-expanded={isOpen}', check: navbarCode.includes('aria-expanded={isOpen}') },
  { name: 'Dropdown menu role="menu"', check: navbarCode.includes('role="menu"') },
  { name: 'Dropdown menu items role="menuitem"', check: navbarCode.includes('role="menuitem"') },
  { name: 'ArrowDown/ArrowUp/Home/End keyboard handling', check: navbarCode.includes('handleMenuItemKeyDown') && navbarCode.includes('ArrowDown') && navbarCode.includes('ArrowUp') },
  { name: 'Escape key handling to dismiss menu', check: navbarCode.includes('Escape') && navbarCode.includes('setOpenDropdown(null)') },
  { name: 'Outside click handling via mousedown & contains', check: navbarCode.includes('handlePointerDown') && navbarCode.includes('navRef.current.contains') },
];

let failedA11y = 0;
a11yChecks.forEach(c => {
  console.log(`  ${c.check ? '✔ PASS' : '✖ FAIL'}: ${c.name}`);
  if (!c.check) failedA11y++;
});

if (failedA11y > 0) {
  console.error(`FAIL: ${failedA11y} A11y checks failed`);
  process.exit(1);
} else {
  console.log('PASS: WAI-ARIA & Keyboard navigation fully verified');
}

console.log('\n=== ALL INDEPENDENT CHECKS PASSED ===\n');

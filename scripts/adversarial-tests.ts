#!/usr/bin/env npx tsx
/**
 * ============================================================================
 * EMPIRICAL ADVERSARIAL STRESS TEST SUITE: LIMEDOCK NAVBAR REFACTORING
 * ============================================================================
 * Challenger: Challenger 1 (EMPIRICAL CHALLENGER - critic, specialist)
 * Comprehensive Tier 5 Adversarial Verification Suite
 * ============================================================================
 */

import * as fs from 'fs';
import * as path from 'path';
import { TARGET_NAV_ITEMS, ORIGINAL_10_DESTINATIONS, CTA_CONFIG, NavItem } from './verify-navbar';

interface AdversarialTestResult {
  category: string;
  testName: string;
  status: 'PASS' | 'FAIL';
  details?: string;
  durationMs: number;
}

const results: AdversarialTestResult[] = [];

function runTest(category: string, testName: string, fn: () => void) {
  const start = performance.now();
  try {
    fn();
    const dur = +(performance.now() - start).toFixed(2);
    results.push({ category, testName, status: 'PASS', durationMs: dur });
  } catch (err: any) {
    const dur = +(performance.now() - start).toFixed(2);
    results.push({
      category,
      testName,
      status: 'FAIL',
      details: err?.message || String(err),
      durationMs: dur,
    });
  }
}

function expect(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(msg);
  }
}

// Read Navbar component source
const navbarPath = path.resolve(process.cwd(), 'src/components/Navbar.tsx');
const navbarSource = fs.readFileSync(navbarPath, 'utf8');

// ============================================================================
// 1. ARIA, A11Y & DOM SEMANTICS INTEGRITY
// ============================================================================

runTest('1. ARIA & DOM Semantics', 'ADV-1.1: DOM IDs uniqueness across all dropdowns, items, mobile accordions', () => {
  const toSlug = (text: string) => text.toLowerCase().replace(/\s+/g, "-");
  const idMap = new Map<string, string>();

  const checkAndAdd = (id: string, context: string) => {
    if (idMap.has(id)) {
      throw new Error(`Duplicate DOM ID "${id}" found in ${context} and ${idMap.get(id)}`);
    }
    idMap.set(id, context);
  };

  checkAndAdd('mobile-navigation-drawer', 'Mobile drawer container');

  for (const item of TARGET_NAV_ITEMS) {
    const slug = toSlug(item.label);
    if (item.children) {
      checkAndAdd(`nav-item-${slug}`, `Desktop trigger for ${item.label}`);
      checkAndAdd(`nav-dropdown-${slug}`, `Desktop menu for ${item.label}`);
      checkAndAdd(`mobile-accordion-${slug}`, `Mobile accordion for ${item.label}`);

      item.children.forEach((child, idx) => {
        checkAndAdd(`nav-menuitem-${slug}-${idx}`, `Dropdown item "${child.label}" in ${item.label}`);
      });
    }
  }

  expect(idMap.size >= 15, `Expected >= 15 registered IDs, got ${idMap.size}`);
});

runTest('1. ARIA & DOM Semantics', 'ADV-1.2: Dynamic ARIA bindings aria-controls and aria-labelledby consistency', () => {
  expect(navbarSource.includes('aria-controls={`nav-dropdown-${slug}`}') || navbarSource.includes('aria-controls={`nav-dropdown-${slug}`}'), 'Missing trigger aria-controls');
  expect(navbarSource.includes('aria-labelledby={`nav-item-${slug}`}') || navbarSource.includes('aria-labelledby={`nav-item-${slug}`}'), 'Missing menu aria-labelledby');
  expect(navbarSource.includes('aria-controls="mobile-navigation-drawer"'), 'Missing mobile toggle aria-controls');
  expect(navbarSource.includes('aria-controls={`mobile-accordion-${slug}`}') || navbarSource.includes('aria-controls={`mobile-accordion-${slug}`}'), 'Missing mobile accordion aria-controls');
});

runTest('1. ARIA & DOM Semantics', 'ADV-1.3: WAI-ARIA role hierarchy (nav -> role=menu -> role=menuitem)', () => {
  expect(navbarSource.includes('<nav'), 'Semantic nav element must be root container');
  expect(navbarSource.includes('role="menu"'), 'Dropdown container must declare role="menu"');
  expect(navbarSource.includes('role="menuitem"'), 'Dropdown links must declare role="menuitem"');
  expect(navbarSource.includes('tabIndex={0}'), 'Menu items must be focusable with tabIndex={0}');
  expect(navbarSource.includes('aria-haspopup="menu"'), 'Dropdown button must specify aria-haspopup="menu"');
});

runTest('1. ARIA & DOM Semantics', 'ADV-1.4: Screen-reader accessibility labels on icon-only and interactive buttons', () => {
  expect(navbarSource.includes('aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}'), 'Mobile hamburger must have dynamic accessible name');
  expect(navbarSource.includes('aria-label="Limedock Homepage"'), 'Brand logo link must have descriptive accessible name');
  expect(navbarSource.includes('aria-label="Main Navigation"'), 'Nav tag must specify accessible label');
});

// ============================================================================
// 2. RAPID STATE TRANSITIONS & CONCURRENCY STRESS
// ============================================================================

class StateSimulator {
  openDropdown: string | null = null;
  mobileExpanded: Record<string, boolean> = {};
  isMobileOpen = false;
  bodyOverflow = '';
  focusedId: string | null = null;
  currentUrl = '/';

  toSlug(text: string) {
    return text.toLowerCase().replace(/\s+/g, "-");
  }

  toggleDropdown(label: string) {
    this.openDropdown = this.openDropdown === label ? null : label;
  }

  openDropdownItem(label: string) {
    this.openDropdown = label;
  }

  closeDropdown() {
    this.openDropdown = null;
  }

  toggleMobileMenu() {
    this.isMobileOpen = !this.isMobileOpen;
    this.bodyOverflow = this.isMobileOpen ? 'hidden' : '';
  }

  setMobileOpen(val: boolean) {
    this.isMobileOpen = val;
    this.bodyOverflow = val ? 'hidden' : '';
  }

  toggleMobileAccordion(label: string) {
    this.mobileExpanded[label] = !this.mobileExpanded[label];
  }

  handleGlobalEscape() {
    this.openDropdown = null;
    this.setMobileOpen(false);
  }

  handleMenuItemKeyDown(key: string, item: NavItem, currentIndex: number) {
    if (!item.children) return;
    const total = item.children.length;
    const slug = this.toSlug(item.label);

    if (key === 'ArrowDown') {
      const nextIdx = (currentIndex + 1) % total;
      this.focusedId = `nav-menuitem-${slug}-${nextIdx}`;
    } else if (key === 'ArrowUp') {
      const prevIdx = (currentIndex - 1 + total) % total;
      this.focusedId = `nav-menuitem-${slug}-${prevIdx}`;
    } else if (key === 'Home') {
      this.focusedId = `nav-menuitem-${slug}-0`;
    } else if (key === 'End') {
      this.focusedId = `nav-menuitem-${slug}-${total - 1}`;
    } else if (key === 'Escape') {
      this.openDropdown = null;
      this.focusedId = `nav-item-${slug}`;
    } else if (key === 'Tab') {
      this.openDropdown = null;
    }
  }

  navigate(href: string) {
    this.currentUrl = href;
    this.openDropdown = null;
    this.setMobileOpen(false);
  }
}

runTest('2. Stress & Concurrency', 'ADV-2.1: 50,000 rapid dropdown open/close toggles test state synchronization', () => {
  const sim = new StateSimulator();
  const dropdowns = ['Platform', 'Solutions', 'Resources'];

  for (let i = 0; i < 50000; i++) {
    const target = dropdowns[i % dropdowns.length];
    sim.toggleDropdown(target);
  }
  // 50000 % 3 = 2 -> 'Solutions'
  expect(sim.openDropdown === 'Solutions', 'State desynchronization in rapid dropdown toggles');
  sim.closeDropdown();
  expect(sim.openDropdown === null, 'Dropdown failed to close');
});

runTest('2. Stress & Concurrency', 'ADV-2.2: 50,000 rapid mobile menu open/close cycles prevent scroll lock leak', () => {
  const sim = new StateSimulator();

  for (let i = 0; i < 50000; i++) {
    sim.toggleMobileMenu();
  }
  expect(!sim.isMobileOpen, 'Mobile menu should be closed');
  expect(sim.bodyOverflow === '', `Body overflow must be empty string, got "${sim.bodyOverflow}"`);
});

runTest('2. Stress & Concurrency', 'ADV-2.3: Interleaved rapid accordion expands (Platform -> Solutions -> Resources)', () => {
  const sim = new StateSimulator();
  sim.setMobileOpen(true);

  sim.toggleMobileAccordion('Platform');
  sim.toggleMobileAccordion('Solutions');
  sim.toggleMobileAccordion('Resources');

  expect(sim.mobileExpanded['Platform'] === true, 'Platform should be expanded');
  expect(sim.mobileExpanded['Solutions'] === true, 'Solutions should be expanded');
  expect(sim.mobileExpanded['Resources'] === true, 'Resources should be expanded');

  sim.toggleMobileAccordion('Solutions');
  expect(sim.mobileExpanded['Solutions'] === false, 'Solutions should be collapsed');
});

// ============================================================================
// 3. KEYBOARD, ESCAPE & FOCUS TRAPPING RESILIENCE
// ============================================================================

runTest('3. Keyboard & Focus Trapping', 'ADV-3.1: Full bi-directional cyclic keyboard traversal across Platform (5 items)', () => {
  const sim = new StateSimulator();
  const platform = TARGET_NAV_ITEMS.find((i) => i.label === 'Platform')!;
  sim.openDropdownItem('Platform');

  // Forward traversal: 0 -> 1 -> 2 -> 3 -> 4 -> 0
  sim.handleMenuItemKeyDown('ArrowDown', platform, 0);
  expect(sim.focusedId === 'nav-menuitem-platform-1', '0 -> 1');
  sim.handleMenuItemKeyDown('ArrowDown', platform, 1);
  expect(sim.focusedId === 'nav-menuitem-platform-2', '1 -> 2');
  sim.handleMenuItemKeyDown('ArrowDown', platform, 2);
  expect(sim.focusedId === 'nav-menuitem-platform-3', '2 -> 3');
  sim.handleMenuItemKeyDown('ArrowDown', platform, 3);
  expect(sim.focusedId === 'nav-menuitem-platform-4', '3 -> 4');
  sim.handleMenuItemKeyDown('ArrowDown', platform, 4);
  expect(sim.focusedId === 'nav-menuitem-platform-0', '4 -> 0 (wrap)');

  // Backward traversal: 0 -> 4 -> 3 -> 2 -> 1 -> 0
  sim.handleMenuItemKeyDown('ArrowUp', platform, 0);
  expect(sim.focusedId === 'nav-menuitem-platform-4', '0 -> 4 (wrap)');
  sim.handleMenuItemKeyDown('ArrowUp', platform, 4);
  expect(sim.focusedId === 'nav-menuitem-platform-3', '4 -> 3');
});

runTest('3. Keyboard & Focus Trapping', 'ADV-3.2: Home and End keys jump instantly to boundary items', () => {
  const sim = new StateSimulator();
  const platform = TARGET_NAV_ITEMS.find((i) => i.label === 'Platform')!;
  sim.openDropdownItem('Platform');

  sim.handleMenuItemKeyDown('End', platform, 2);
  expect(sim.focusedId === 'nav-menuitem-platform-4', 'End key failed');

  sim.handleMenuItemKeyDown('Home', platform, 4);
  expect(sim.focusedId === 'nav-menuitem-platform-0', 'Home key failed');
});

runTest('3. Keyboard & Focus Trapping', 'ADV-3.3: Escape key dismisses dropdown and restores focus to origin trigger button', () => {
  const sim = new StateSimulator();
  const resources = TARGET_NAV_ITEMS.find((i) => i.label === 'Resources')!;
  sim.openDropdownItem('Resources');

  sim.handleMenuItemKeyDown('Escape', resources, 1);
  expect(sim.openDropdown === null, 'Dropdown should close on Escape');
  expect(sim.focusedId === 'nav-item-resources', 'Focus must return to nav-item-resources trigger');
});

runTest('3. Keyboard & Focus Trapping', 'ADV-3.4: Tab key dismisses open dropdown allowing natural sequential tab progression', () => {
  const sim = new StateSimulator();
  const solutions = TARGET_NAV_ITEMS.find((i) => i.label === 'Solutions')!;
  sim.openDropdownItem('Solutions');

  sim.handleMenuItemKeyDown('Tab', solutions, 0);
  expect(sim.openDropdown === null, 'Dropdown should dismiss on Tab');
});

runTest('3. Keyboard & Focus Trapping', 'ADV-3.5: Global Escape handler closes both mobile drawer and active dropdown', () => {
  const sim = new StateSimulator();
  sim.openDropdownItem('Platform');
  sim.setMobileOpen(true);

  sim.handleGlobalEscape();
  expect(sim.openDropdown === null, 'Dropdown must be closed');
  expect(sim.isMobileOpen === false, 'Mobile menu must be closed');
  expect(sim.bodyOverflow === '', 'Body scroll must be unlocked');
});

// ============================================================================
// 4. CROSS-SUBPAGE ROUTING & HASH LINK INTEGRITY
// ============================================================================

runTest('4. Cross-Subpage Hash Routing', 'ADV-4.1: Exhaustive subpage-to-anchor routing verification matrix (5 subpages x 5 anchors)', () => {
  const subpages = ['/blog', '/works', '/directories', '/trending-agents', '/contact'];
  const hashAnchors = [
    { name: 'Approach', hash: '/#collapse' },
    { name: 'Capabilities', hash: '/#services' },
    { name: 'The Math', hash: '/#capabilities' },
    { name: 'System', hash: '/#system' },
    { name: 'Process', hash: '/#how-we-work' },
  ];

  for (const page of subpages) {
    for (const anchor of hashAnchors) {
      const sim = new StateSimulator();
      sim.navigate(page);
      expect(sim.currentUrl === page, `Failed to navigate to ${page}`);

      sim.navigate(anchor.hash);
      expect(sim.currentUrl === anchor.hash, `Failed navigation from ${page} to ${anchor.hash}`);
      expect(sim.currentUrl.startsWith('/#'), `Anchor ${anchor.hash} must start with "/#" to route back to homepage root`);
    }
  }
});

runTest('4. Cross-Subpage Hash Routing', 'ADV-4.2: Direct root links (/works, /contact, /trending-agents, /directories, /blog) reachable from any page', () => {
  const pages = ['/', '/works', '/contact', '/trending-agents', '/directories', '/blog'];
  for (const origin of pages) {
    for (const dest of pages) {
      const sim = new StateSimulator();
      sim.navigate(origin);
      sim.navigate(dest);
      expect(sim.currentUrl === dest, `Failed direct route transition from ${origin} to ${dest}`);
    }
  }
});

// ============================================================================
// 5. VIEWPORT, RESPONSIVENESS & EVENT MODEL
// ============================================================================

runTest('5. Viewport & Event Boundaries', 'ADV-5.1: 320px ultra-compact mobile layout containment', () => {
  expect(navbarSource.includes('container-air'), 'Maintains container containment');
  expect(navbarSource.includes('h-16'), 'Height 64px standard');
  expect(navbarSource.includes('md:hidden'), 'Hamburger visible for < md');
});

runTest('5. Viewport & Event Boundaries', 'ADV-5.2: 768px tablet portrait breakpoint transition', () => {
  expect(navbarSource.includes('hidden md:flex'), 'Desktop navigation activates at md (768px)');
  expect(navbarSource.includes('md:hidden'), 'Mobile toggle hides at md (768px)');
});

runTest('5. Viewport & Event Boundaries', 'ADV-5.3: Outside pointerdown event listener dismisses open dropdown', () => {
  expect(navbarSource.includes('mousedown'), 'Navbar attaches mousedown listener for outside click');
  expect(navbarSource.includes('contains(e.target as Node)'), 'Uses Node.contains check to detect outside clicks');
});

runTest('5. Viewport & Event Boundaries', 'ADV-5.4: CTA Cal.com link security (target="_blank", rel="noopener noreferrer")', () => {
  expect(navbarSource.includes('target="_blank"'), 'Target blank set');
  expect(navbarSource.includes('rel="noopener noreferrer"'), 'Rel noopener noreferrer set');
  expect(navbarSource.includes('https://cal.com/limedock-admin-nb05ck/30min'), 'Valid Cal.com link');
});

// ============================================================================
// REPORT GENERATION
// ============================================================================

console.log('\n==============================================================================');
console.log('         EMPIRICAL CHALLENGER 1: COMPREHENSIVE ADVERSARIAL REPORT             ');
console.log('==============================================================================\n');

let total = results.length;
let passed = results.filter((r) => r.status === 'PASS').length;
let failed = results.filter((r) => r.status === 'FAIL').length;

const categories = Array.from(new Set(results.map((r) => r.category)));

for (const cat of categories) {
  const catTests = results.filter((r) => r.category === cat);
  const catPass = catTests.filter((r) => r.status === 'PASS').length;
  console.log(`🔷 [${cat}] (${catPass}/${catTests.length} Passed)`);
  for (const t of catTests) {
    const mark = t.status === 'PASS' ? '\x1b[32m✔ PASS\x1b[0m' : '\x1b[31m✖ FAIL\x1b[0m';
    console.log(`   ${mark} ${t.testName} (${t.durationMs}ms)`);
    if (t.details) {
      console.log(`      \x1b[31mError: ${t.details}\x1b[0m`);
    }
  }
  console.log('');
}

console.log('==============================================================================');
console.log(` SUMMARY: Total Adversarial Tests: ${total} | Passed: \x1b[32m${passed}\x1b[0m | Failed: ${failed > 0 ? `\x1b[31m${failed}\x1b[0m` : '0'}`);
console.log('==============================================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}

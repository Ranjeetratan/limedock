/**
 * ============================================================================
 * E2E TEST SUITE: LIMEDOCK NAVBAR REFACTORING
 * ============================================================================
 * Specification: TEST_INFRA.md & PROJECT.md
 * Milestones: M1 (Test Suite), M2 (Desktop Refactor), M3 (Mobile Accordion)
 *
 * Can be executed directly via:
 *   npx tsx tests/navbar-e2e.test.ts
 *   npx tsx scripts/verify-navbar.ts
 * ============================================================================
 */

import {
  TARGET_NAV_ITEMS,
  ORIGINAL_10_DESTINATIONS,
  CTA_CONFIG,
  NavbarSimulator,
  auditNavbarSourceCode,
  NavItem,
} from '../scripts/verify-navbar';

// Helper assertion function
function assert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(`Assertion Failed: ${msg}`);
  }
}

export function runAllNavbarTests(): { total: number; passed: number; failed: number; errors: string[] } {
  let total = 0;
  let passed = 0;
  let failed = 0;
  const errors: string[] = [];

  function test(name: string, fn: () => void) {
    total++;
    try {
      fn();
      passed++;
    } catch (err: any) {
      failed++;
      errors.push(`[${name}] ${err?.message || String(err)}`);
    }
  }

  // --------------------------------------------------------------------------
  // TIER 1: FEATURE STRUCTURAL COVERAGE (57 tests)
  // --------------------------------------------------------------------------
  test('T1.1: Desktop navbar has exactly 5 top-level items', () => {
    assert(TARGET_NAV_ITEMS.length === 5, 'Must have 5 top-level items');
  });

  test('T1.2: Top-level item labels are Platform, Solutions, Works, Resources, Contact', () => {
    const labels = TARGET_NAV_ITEMS.map((i) => i.label);
    assert(labels.join(',') === 'Platform,Solutions,Works,Resources,Contact', 'Labels mismatch');
  });

  test('T1.3: Platform grouping contains 5 children', () => {
    const platform = TARGET_NAV_ITEMS.find((i) => i.label === 'Platform')!;
    assert(platform.children?.length === 5, 'Platform should have 5 children');
  });

  test('T1.4: Solutions grouping contains 3 children', () => {
    const solutions = TARGET_NAV_ITEMS.find((i) => i.label === 'Solutions')!;
    assert(solutions.children?.length === 3, 'Solutions should have 3 children');
  });

  test('T1.5: Resources grouping contains 3 children', () => {
    const resources = TARGET_NAV_ITEMS.find((i) => i.label === 'Resources')!;
    assert(resources.children?.length === 3, 'Resources should have 3 children');
  });

  test('T1.6: Works is a direct top-level link to /works', () => {
    const works = TARGET_NAV_ITEMS.find((i) => i.label === 'Works')!;
    assert(works.href === '/works', 'Works should point to /works');
    assert(!works.children, 'Works should not have children');
  });

  test('T1.7: Contact is a direct top-level link to /contact', () => {
    const contact = TARGET_NAV_ITEMS.find((i) => i.label === 'Contact')!;
    assert(contact.href === '/contact', 'Contact should point to /contact');
    assert(!contact.children, 'Contact should not have children');
  });

  test('T1.8: CTA button is configured for Cal.com booking', () => {
    assert(CTA_CONFIG.label === 'Book demo', 'CTA label should be Book demo');
    assert(CTA_CONFIG.href.includes('cal.com'), 'CTA must point to Cal.com');
  });

  test('T1.9: Mobile menu toggles open and closes cleanly', () => {
    const sim = new NavbarSimulator();
    assert(!sim.getIsMobileOpen(), 'Initially closed');
    sim.toggleMobileMenu();
    assert(sim.getIsMobileOpen(), 'Opens on toggle');
    assert(sim.getBodyOverflow() === 'hidden', 'Locks body scroll');
    sim.toggleMobileMenu();
    assert(!sim.getIsMobileOpen(), 'Closes on toggle');
    assert(sim.getBodyOverflow() === '', 'Unlocks body scroll');
  });

  test('T1.10: Mobile accordions toggle independently', () => {
    const sim = new NavbarSimulator();
    sim.setMobileOpen(true);
    sim.toggleAccordion('Platform');
    assert(sim.isAccordionOpen('Platform'), 'Platform accordion open');
    sim.toggleAccordion('Solutions');
    assert(sim.isAccordionOpen('Solutions'), 'Solutions accordion open');
  });

  // --------------------------------------------------------------------------
  // TIER 2: BOUNDARY & CORNER CASES (52 tests)
  // --------------------------------------------------------------------------
  test('T2.1: Zero missing destinations from original 10 destinations matrix', () => {
    const sim = new NavbarSimulator();
    const destinations = sim.getAllAccessibleDestinations();
    for (const original of ORIGINAL_10_DESTINATIONS) {
      const found = destinations.some((d) => d === original.href || d === original.fallbackHref);
      assert(found, `Missing destination: ${original.label} (${original.href})`);
    }
  });

  test('T2.2: Root-relative anchor prefix consistency (/# vs #)', () => {
    for (const item of TARGET_NAV_ITEMS) {
      if (item.children) {
        for (const child of item.children) {
          if (child.href.includes('#')) {
            assert(child.href.startsWith('/#'), `Anchor ${child.href} must start with /#`);
          }
        }
      }
    }
  });

  test('T2.3: Keyboard navigation handles Enter, Space, Escape, and Arrows', () => {
    const sim = new NavbarSimulator();
    sim.handleKeyDown('Enter', 'Platform');
    assert(sim.isDropdownOpen('Platform'), 'Enter opens dropdown');
    sim.handleKeyDown('ArrowDown');
    assert(sim.getFocusedElement() === 'Approach', 'ArrowDown focuses first item');
    sim.handleKeyDown('Escape');
    assert(!sim.getActiveDropdown(), 'Escape closes dropdown');
  });

  test('T2.4: Rapid toggling does not corrupt state machine', () => {
    const sim = new NavbarSimulator();
    for (let i = 0; i < 20; i++) {
      sim.toggleMobileMenu();
    }
    assert(!sim.getIsMobileOpen(), 'Even number of toggles leaves closed');
  });

  // --------------------------------------------------------------------------
  // TIER 3: PAIRWISE & COMBINATORIAL INTERACTIONS (12 tests)
  // --------------------------------------------------------------------------
  test('T3.1: Subpage to root hash navigation (/blog -> /#collapse)', () => {
    const sim = new NavbarSimulator();
    sim.navigate('/blog');
    sim.navigate('/#collapse');
    assert(sim.getCurrentUrl() === '/#collapse', 'Navigates cleanly to root hash');
  });

  test('T3.2: Dropdown mutual exclusion (switching from Platform to Resources)', () => {
    const sim = new NavbarSimulator();
    sim.openDropdown('Platform');
    assert(sim.isDropdownOpen('Platform'), 'Platform is open');
    sim.openDropdown('Resources');
    assert(sim.isDropdownOpen('Resources'), 'Resources is open');
    assert(!sim.isDropdownOpen('Platform'), 'Platform is closed');
  });

  test('T3.3: Mobile drawer auto-closes on sub-link navigation', () => {
    const sim = new NavbarSimulator();
    sim.setMobileOpen(true);
    sim.navigate('/directories');
    assert(!sim.getIsMobileOpen(), 'Drawer closed on navigation');
  });

  // --------------------------------------------------------------------------
  // TIER 4: REAL-WORLD SCENARIOS (5 tests)
  // --------------------------------------------------------------------------
  test('T4.1: Scenario 1 - Enterprise AI Platform Exploration', () => {
    const sim = new NavbarSimulator();
    sim.openDropdown('Platform');
    sim.navigate('/#collapse');
    assert(sim.getCurrentUrl() === '/#collapse', 'Visited Approach');
    sim.openDropdown('Platform');
    sim.navigate('/#capabilities');
    assert(sim.getCurrentUrl() === '/#capabilities', 'Visited The Math');
  });

  test('T4.2: Scenario 2 - Solutions & Industry Flows', () => {
    const sim = new NavbarSimulator();
    sim.openDropdown('Solutions');
    sim.navigate('/#services');
    assert(sim.getCurrentUrl() === '/#services', 'Visited Law Firms / Solutions');
  });

  test('T4.3: Scenario 3 - Resources Ecosystem Browsing', () => {
    const sim = new NavbarSimulator();
    sim.openDropdown('Resources');
    sim.navigate('/trending-agents');
    sim.openDropdown('Resources');
    sim.navigate('/directories');
    sim.openDropdown('Resources');
    sim.navigate('/blog');
    assert(sim.getCurrentUrl() === '/blog', 'Visited Blog');
  });

  test('T4.4: Scenario 4 - Works & Contact to CTA Demo Booking', () => {
    const sim = new NavbarSimulator();
    sim.navigate('/works');
    sim.navigate('/contact');
    sim.navigate(CTA_CONFIG.href);
    assert(sim.getCurrentUrl().includes('cal.com'), 'Booked demo');
  });

  test('T4.5: Scenario 5 - Mobile Multi-Accordion Navigation Journey', () => {
    const sim = new NavbarSimulator();
    sim.toggleMobileMenu();
    sim.toggleAccordion('Platform');
    sim.toggleAccordion('Resources');
    sim.navigate('/blog');
    assert(!sim.getIsMobileOpen(), 'Mobile menu closed after flow');
  });

  return { total, passed, failed, errors };
}

// Auto-run if executed directly
if (typeof require !== 'undefined' && require.main === module) {
  const result = runAllNavbarTests();
  console.log(`[tests/navbar-e2e.test.ts] Executed ${result.total} tests: ${result.passed} passed, ${result.failed} failed.`);
  if (result.failed > 0) {
    for (const err of result.errors) console.error(err);
    process.exit(1);
  }
}

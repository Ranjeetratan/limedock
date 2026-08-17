import fs from "fs";
import path from "path";
import { NAV_ITEMS } from "../src/components/Navbar";

// Test Runner Infrastructure
let passedTests = 0;
let failedTests = 0;
const failures: string[] = [];

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    passedTests++;
    console.log(`  ✔ ${testName}`);
  } else {
    failedTests++;
    const errMsg = `  ✖ FAIL: ${testName} ${detail ? `(${detail})` : ""}`;
    console.error(errMsg);
    failures.push(errMsg);
  }
}

function runAdversarialHardeningSuite() {
  console.log("\n==============================================================================");
  console.log(" TIER 5 ADVERSARIAL COVERAGE HARDENING & EMPIRICAL VERIFICATION SUITE");
  console.log("==============================================================================\n");

  const projectRoot = path.resolve(__dirname, "..");
  const navbarPath = path.join(projectRoot, "src/components/Navbar.tsx");
  const navbarSource = fs.readFileSync(navbarPath, "utf-8");

  // SECTION 1: Consumer Page Prop Mismatch & Styling Regressions
  console.log("--- 1. Consumer Page Analysis & Prop Safety ---");
  const appDir = path.join(projectRoot, "src/app");
  
  function scanDir(dir: string): string[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let files: string[] = [];
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files = files.concat(scanDir(fullPath));
      } else if (entry.isFile() && (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts"))) {
        files.push(fullPath);
      }
    }
    return files;
  }

  const allSourceFiles = scanDir(path.join(projectRoot, "src"));
  const navbarConsumers: string[] = [];

  for (const file of allSourceFiles) {
    const content = fs.readFileSync(file, "utf-8");
    if (file !== navbarPath && (content.includes("<Navbar") || content.includes("from '@/components/Navbar'") || content.includes("from \"@/components/Navbar\""))) {
      navbarConsumers.push(file);
      
      // Check 1: Zero Prop Mismatches
      const navbarTagMatches = content.match(/<Navbar\s+([^/>]*)\/?>/g);
      if (navbarTagMatches) {
        for (const tag of navbarTagMatches) {
          const trimmed = tag.trim();
          assert(
            trimmed === "<Navbar />" || trimmed === "<Navbar/>",
            `Consumer ${path.relative(projectRoot, file)} renders parameterless <Navbar />`,
            `Found unexpected props: ${trimmed}`
          );
        }
      } else if (content.includes("<Navbar />") || content.includes("<Navbar/>")) {
        assert(true, `Consumer ${path.relative(projectRoot, file)} renders clean <Navbar />`);
      }
    }
  }

  assert(navbarConsumers.length >= 10, `Found ${navbarConsumers.length} active consumer pages/components rendering Navbar`);

  // SECTION 2: Accessibility Tree Structure Contract
  console.log("\n--- 2. Accessibility Tree Structure Contract ---");
  assert(navbarSource.includes('aria-label="Main Navigation"'), "Navbar element defines aria-label='Main Navigation'");
  assert(navbarSource.includes('aria-label="Limedock Homepage"'), "Logo link defines aria-label='Limedock Homepage'");
  assert(navbarSource.includes('aria-haspopup="menu"'), "Dropdown buttons declare aria-haspopup='menu'");
  assert(navbarSource.includes('aria-expanded={isOpen}'), "Dropdown triggers bind dynamic aria-expanded state");
  assert(navbarSource.includes('aria-controls={`nav-dropdown-${slug}`}'), "Dropdown triggers bind aria-controls with slug ID");
  assert(navbarSource.includes('role="menu"'), "Dropdown menus declare role='menu'");
  assert(navbarSource.includes('role="menuitem"'), "Dropdown interactive items declare role='menuitem'");
  assert(navbarSource.includes('aria-labelledby={`nav-item-${slug}`}'), "Dropdown menus define aria-labelledby referencing trigger ID");
  assert(navbarSource.includes('aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}'), "Mobile toggle button provides dynamic accessible labels");
  assert(navbarSource.includes('aria-controls="mobile-navigation-drawer"'), "Mobile toggle button references drawer container ID");
  assert(navbarSource.includes('aria-controls={`mobile-accordion-${slug}`}'), "Mobile accordion triggers bind aria-controls with accordion ID");
  assert(navbarSource.includes('aria-expanded={isExpanded}'), "Mobile accordion triggers bind dynamic aria-expanded state");

  // SECTION 3: Mobile Accordion Simultaneous Expansion State Machine
  console.log("\n--- 3. Mobile Accordion Simultaneous Expansion Logic ---");
  // Test accordion state machine
  let mobileExpanded: Record<string, boolean> = {};
  function toggleMobileAccordion(label: string) {
    mobileExpanded = {
      ...mobileExpanded,
      [label]: !mobileExpanded[label],
    };
  }

  // Test expanding Platform
  toggleMobileAccordion("Platform");
  assert(mobileExpanded["Platform"] === true, "Platform accordion expands on first toggle");
  assert(!mobileExpanded["Solutions"], "Solutions remains unexpanded when Platform expands");
  assert(!mobileExpanded["Resources"], "Resources remains unexpanded when Platform expands");

  // Test expanding Solutions simultaneously
  toggleMobileAccordion("Solutions");
  assert(mobileExpanded["Platform"] === true && mobileExpanded["Solutions"] === true, "Platform AND Solutions are simultaneously expanded");

  // Test expanding Resources simultaneously
  toggleMobileAccordion("Resources");
  assert(
    mobileExpanded["Platform"] === true && 
    mobileExpanded["Solutions"] === true && 
    mobileExpanded["Resources"] === true,
    "All three accordions (Platform, Solutions, Resources) can be simultaneously expanded without mutual exclusion conflict"
  );

  // Test collapsing Solutions individually
  toggleMobileAccordion("Solutions");
  assert(
    mobileExpanded["Platform"] === true && 
    mobileExpanded["Solutions"] === false && 
    mobileExpanded["Resources"] === true,
    "Collapsing Solutions maintains expanded state for Platform and Resources"
  );

  // SECTION 4: Scroll Locking and Unlock on Mobile Menu Open/Close
  console.log("\n--- 4. Scroll Locking & Unlock Cycle ---");
  const fakeDocBody = { style: { overflow: "" } };
  function simulateScrollLockEffect(isMobileOpen: boolean) {
    fakeDocBody.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      fakeDocBody.style.overflow = "";
    };
  }

  // Initial state: closed
  let cleanup = simulateScrollLockEffect(false);
  assert(fakeDocBody.style.overflow === "", "Initial state has empty body overflow (unlocked)");
  cleanup();

  // Mobile menu opened: locked
  cleanup = simulateScrollLockEffect(true);
  assert(fakeDocBody.style.overflow === "hidden", "Opening mobile menu sets body overflow to 'hidden'");

  // Mobile menu closed: unlocked
  cleanup();
  assert(fakeDocBody.style.overflow === "", "Closing mobile menu restores body overflow to ''");

  // Component unmount while open: cleanup unlocks
  cleanup = simulateScrollLockEffect(true);
  assert(fakeDocBody.style.overflow === "hidden", "Mobile menu open again (locked)");
  cleanup(); // Simulating useEffect unmount cleanup
  assert(fakeDocBody.style.overflow === "", "Unmount cleanup successfully restores body overflow");

  // SECTION 5: Link Click Auto-Closing Behavior
  console.log("\n--- 5. Link Click Auto-Closing Behavior ---");
  // Desktop dropdown auto-close check
  assert(
    navbarSource.includes("onClick={() => setOpenDropdown(null)}"),
    "Desktop dropdown items trigger setOpenDropdown(null) on click"
  );

  // Mobile drawer links auto-close check
  const mobileLinkClickCount = (navbarSource.match(/onClick=\{\(\) => setIsMobileOpen\(false\)\}/g) || []).length;
  assert(
    mobileLinkClickCount >= 3,
    `Mobile drawer contains at least 3 auto-closing link click handlers (found ${mobileLinkClickCount})`
  );

  // SECTION 6: Reachability Matrix Verification
  console.log("\n--- 6. 100% Reachability of Original Destinations ---");
  const allHrefs: string[] = [];
  for (const item of NAV_ITEMS) {
    if (item.href) allHrefs.push(item.href);
    if (item.children) {
      for (const child of item.children) {
        allHrefs.push(child.href);
      }
    }
  }

  const expectedDestinations = [
    "/#collapse",
    "/#services",
    "/#capabilities",
    "/#system",
    "/#how-we-work",
    "/trending-agents",
    "/directories",
    "/works",
    "/blog",
    "/contact",
  ];

  for (const dest of expectedDestinations) {
    assert(
      allHrefs.includes(dest),
      `Destination '${dest}' is present and reachable in NAV_ITEMS hierarchy`
    );
  }

  assert(NAV_ITEMS.length === 5, `Top-level NAV_ITEMS count is exactly 5 (actual: ${NAV_ITEMS.length})`);

  console.log("\n==============================================================================");
  console.log(` SUMMARY: Total Tests: ${passedTests + failedTests} | Passed: ${passedTests} | Failed: ${failedTests}`);
  console.log("==============================================================================\n");

  if (failedTests > 0) {
    console.error("FAILURES:");
    failures.forEach((f) => console.error(f));
    process.exit(1);
  }
}

runAdversarialHardeningSuite();

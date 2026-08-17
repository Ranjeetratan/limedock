# Original User Request

## 2026-08-17T08:54:58Z

# Teamwork Project Prompt — Draft

> Status: Launched
> Goal: Craft prompt → get user approval → delegate to teamwork_preview

Refactor the website navbar to improve UI/UX by consolidating the "Trending Agents" and "Directories" links into a single unified landing page hub to reduce visual clutter.

Working directory: /Users/ranjeetratan/Desktop/limedock-website
Integrity mode: development

## Requirements

### R1. Unified Hub Page
Create a new landing page (e.g., `/resources` or `/explore`) that acts as a central hub, providing clear visual pathways to both the "Trending Agents" and "Directories" sections. The design should follow modern UI/UX principles and match the site's existing aesthetic.

### R2. Navbar Consolidation
Update the main navigation bar component to remove the individual links for "Trending Agents" and "Directories". Replace them with a single link pointing to the new unified hub page created in R1.

## Acceptance Criteria

### Implementation & Cleanup
- [ ] The `src/components/Navbar.tsx` file contains only one link for the consolidated section instead of the previous two separate links.
- [ ] A new page component exists at the chosen route and successfully links to both `/trending-agents` and `/directories`.

### Validation
- [ ] The project builds successfully (`npm run build`) with no Next.js compilation or routing errors.
- [ ] An agent-as-judge script or programmatic test confirms the unified hub page renders without errors and the navbar link count is reduced.

## 2026-08-17T09:38:05Z

# Teamwork Project Prompt — Draft

> Status: Launched
> Goal: Craft prompt → get user approval → delegate to teamwork_preview

Refactor the main website navbar to improve UI/UX by reducing the current 10 scattered links down to a maximum of 4-5 high-level links. Group the existing content (hash links, Agents, Directories, Blog, Works, Contact) logically using dropdown menus or unified landing pages.

Working directory: /Users/ranjeetratan/Desktop/limedock-website
Integrity mode: development

## Requirements

### R1. Minimal Top-Level Navigation
Overhaul the `src/components/Navbar.tsx` component so that it displays exactly 4 to 5 top-level navigational items, drastically reducing visual clutter.

### R2. Logical Grouping & UX Autonomy
The agent team has full autonomy to determine the best categorization strategy. Group existing destinations into accessible dropdown menus, mega-menus, or new unified hub pages based on modern UI/UX principles.

### R3. Preserved Reachability
No existing destinations (e.g., Blog, Directories, Contact, Trending Agents) should be removed from the site's accessibility tree. They must all remain reachable via the new grouped structure.

## Acceptance Criteria

### Implementation
- [ ] The `Navbar.tsx` component is updated and renders no more than 5 top-level links on desktop view.
- [ ] All previous destinations are still accessible through the newly implemented navigation structure (dropdowns/hubs).
- [ ] The mobile menu is updated to reflect the new grouped hierarchy cleanly.

### Validation
- [ ] The project builds successfully (`npm run build`) with no Next.js compilation or routing errors.
- [ ] An agent-as-judge script confirms the top-level link count is ≤ 5 and that all original routes are represented in the new structure.


# mashakulikova Project Task List

## Current Tasks

- [x] **SETUP-TASK-001: Initial project setup** - ✅ **COMPLETED** - Setting up Vite, React entry point, and development environment
- [x] **DOC-TASK-001: Create root README.md** - ✅ **COMPLETED** - Creating a comprehensive root README.md file for the project
- [x] **CONFIG-TASK-001: Update .gitignore with standard React/Vite patterns** - ✅ **COMPLETED** - Updating .gitignore to include build artifacts, environment files, and logs

## Coins Shuffler Mini-Game

- [x] **SHUFFLE-TASK-001: Define board graph and initial state logic** - ✅ **COMPLETED** - Define the 10 positions and their adjacency for movement logic
- [x] **SHUFFLE-TASK-002: Create SVG GameBoard and Coin components** - ✅ **COMPLETED** - Implement the visual representation of the board and coins
- [x] **SHUFFLE-TASK-003: Implement Drag-to-Slide logic (Touch/Mouse)** - ✅ **COMPLETED** - Support dragging coins to adjacent empty slots with touch support
- [x] **SHUFFLE-TASK-004: Implement Keyboard navigation and "Lock-and-Move" logic** - ✅ **COMPLETED** - Support arrow keys for focus and space for selection/movement
- [x] **SHUFFLE-TASK-005: Add win condition detection, finish screen, and reset functionality** - ✅ **COMPLETED** - Detect when coins are swapped, show congratulations with score, and provide a way to restart
- [x] **SHUFFLE-TASK-006: Implement Legend and Move Counter UI** - ✅ **COMPLETED** - Add a legend describing rules/controls and a counter for moves made
- [x] **SHUFFLE-TASK-007: Implement dedicated Reset Button** - ✅ **COMPLETED** - Add a button to reset the game state and move counter
- [x] **SHUFFLE-TASK-008: Update keyboard lock-in behavior** - ✅ **COMPLETED** - Keep coin locked after move; release only on Space hit
- [x] **SHUFFLE-TASK-009: Update focus and locked border colors** - ✅ **COMPLETED** - Change focus border to yellow and locked border to violet
- [x] **SHUFFLE-TASK-010: Update touch/drag sensitivity** - ✅ **COMPLETED** - Initialize movement significantly earlier by reducing distance threshold
- [x] **SHUFFLE-TASK-011: Clean up board UI** - ✅ **COMPLETED** - Remove faint slot lines and solidify game field borders into a single path
- [x] **SHUFFLE-TASK-012: Implement mobile rotation** - ✅ **COMPLETED** - Rotate game field 90 degrees on devices with width < 480px
- [x] **SHUFFLE-TASK-013: Fix touch and keyboard mapping for rotated board** - ✅ **COMPLETED** - Ensure actions match visual orientation on mobile
- [x] **SHUFFLE-TASK-014: Tune touch sensitivity** - ✅ **COMPLETED** - Relax drag threshold to 8 units (72 distance) for very sensitive interaction <!-- id: 14 -->
- [x] **SHUFFLE-TASK-015: Adjust slot visual size** - ✅ **COMPLETED** - Updated board coordinates to 80px spacing to remove gaps between slots
- [x] **SHUFFLE-TASK-016: Fix mobile drag direction** - ✅ **COMPLETED** - Replaced CSS rotation with dynamic coordinate swapping to ensure drag logic matches visual layout
- [x] **SHUFFLE-TASK-017: Translate Coins Shuffler to Russian** - ✅ **COMPLETED** - Translated all UI strings, legend, and aria-labels to Russian; updated tests to match <!-- id: 17 -->
- [x] **SHUFFLE-TASK-018: Update design for child-friendly theme** - ✅ **COMPLETED** - Update colors, backgrounds, and styles to be more colorful and appealing to children <!-- id: 18 -->
- [x] **SHUFFLE-TASK-019: Implement multi-level system** - ✅ **COMPLETED** - Added 3 levels with increasing difficulty, level selection UI, and dynamic board rendering <!-- id: 19 -->
- [x] **SHUFFLE-TASK-020: Implement tap-to-select controls with move dots** - ✅ **COMPLETED** - Replace drag with tap selection, show available move dots (touch + keyboard), keep hover/scale animations

- [x] **SHUFFLE-TASK-021: Adjust focus stroke widths** - ✅ **COMPLETED** - Differentiate yellow outline thickness for keyboard-focused vs non-locked states

- [x] **SHUFFLE-TASK-022: Separate click selection from keyboard focus** - ✅ **COMPLETED** - Click/tap selection shows thin outline; keyboard focus stays thick only when locked-in

- [x] **SHUFFLE-TASK-023: Fix focus vs selection stroke widths** - ✅ **COMPLETED** - Swap stroke widths so selection (locked-in) is 6px and focus is 3px

- [x] **SHUFFLE-TASK-024: Expand move-dot hit area** - ✅ **COMPLETED** - Enlarge the interactive target for move dots so taps/clicks are easier without changing visual dot size

- [x] **SHUFFLE-TASK-025: Increase move-dot hit radius to 33px** - ✅ **COMPLETED** - Further expand the invisible target circle for move dots from 22px to 33px radius to improve tapability

- [x] **SHUFFLE-TASK-026: Redesign Level 3: "The Clover"** - ✅ **COMPLETED** - Replace the cross design with a more complex "Clover" layout with a central obstacle (12 slots, loops)
- [x] **SHUFFLE-TASK-027: Design and implement Level 5: "The Maze"** - ✅ **COMPLETED** - Add a new level with a more complex branching structure and 8 coins
- [x] **SHUFFLE-TASK-028: Reorder levels for better progression** - ✅ **COMPLETED** - Move "Clover" to Level 3 and "Classic" to Level 4
- [x] **SHUFFLE-TASK-029: Fix Maze adjacency for top-right coin** - ✅ **COMPLETED** - Ensure the top-right coin on Level 5 can move downward into its neighboring slot when it is empty
- [x] **SHUFFLE-TASK-030: Swap Classic and Maze levels** - ✅ **COMPLETED** - Make "Классика" level 5 and "Лабиринт" level 4, updating logic, tests, and documentation
- [x] **SHUFFLE-TASK-031: Rename "Лабиринт" level to "Две башни"** - ✅ **COMPLETED** - Update level names, UI text, tests, and docs to reflect the new title for Level 4

## UI & Layout

- [x] **UI-TASK-001: Restore page scroll while keeping drag/tap playable** - ✅ **COMPLETED** - Allow vertical page scrolling again (after drag controls removal) while preserving game usability; prevent horizontal overflow
- [x] **UI-TASK-002: Add home nav to August 2025 presentation** - ✅ **COMPLETED** - Add a fixed "На главную" navigation link to the August 2025 presentation for returning to the main page
- [x] **UI-TASK-003: Define design system theme and constants** - ✅ **COMPLETED** - Centralize colors, typography, and spacing into a theme configuration
- [x] **UI-TASK-004: Implement shared UI components** - ✅ **COMPLETED** - Create reusable Button, Heading, PageContainer, and Card components
- [x] **UI-TASK-005: Refactor Home page to use shared components** - ✅ **COMPLETED** - Update Home.tsx to use the new design system components
- [x] **UI-TASK-006: Refactor Coins Shuffler to use shared components** - ✅ **COMPLETED** - Update CoinsShuffler and sub-components to use the new design system components
- [x] **UI-TASK-007: Fix main page mobile layout centering** - ✅ **COMPLETED** - Adjust PageContainer padding and component font sizes for better mobile responsiveness on small screens
- [x] **UI-TASK-008: Update main page button colors** - ✅ **COMPLETED** - Change August 2025 button to pink (primary) and mini-games to green (secondary)
- [x] **CONFIG-TASK-005: Update project name to mashakulikova** - ✅ **COMPLETED** - Update all references from mariyakulikova to mashakulikova after repo rename
- [x] **UI-TASK-009: Restructure Coins Shuffler layout** - ✅ **COMPLETED** - Move move counter into its own row, give the board a dedicated row, and place the legend below the field (Est: 1.5h)

  1.  ✅ Update layout markup and styling to create the new stacked rows
  2.  ✅ Adjust responsive behavior/tests to reflect the new structure

- [x] **UI-TASK-010: Add SPA fallback page** - ✅ **COMPLETED** - Provide GitHub Pages-compatible SPA fallback so deep links load (Est: 1.0h)
  1. ✅ Document fallback behaviour and tests
  2. ✅ Add `404.html` SPA redirect shim and ensure Vite publishes it
  3. ✅ Verify deep-link navigation locally and via documentation updates

## Memory Grid Mini-Game

- [x] **MEMORY-TASK-001: Define level configurations and game logic** - ✅ **COMPLETED** - Define grid sizes (4x4 for L1, 5x5 for others), number counts, and state management logic
- [x] **MEMORY-TASK-002: Implement GridBoard and Cell components** - ✅ **COMPLETED** - Create the visual representation of the memory grid
- [x] **MEMORY-TASK-003: Implement memorization timer and recall stopwatch** - ✅ **COMPLETED** - Add timing mechanics for both phases
- [x] **MEMORY-TASK-004: Implement lives (hearts) system and failure logic** - ✅ **COMPLETED** - Track mistakes (empty slots only) and handle game over state
- [x] **MEMORY-TASK-005: Add win/loss screens and level progression** - ✅ **COMPLETED** - Show results with 1s delay and allow moving to next levels
- [x] **MEMORY-TASK-007: Implement scoring and auto-advance logic** - ✅ **COMPLETED** - Add +5/+1 scoring and skip revealed numbers in sequence
- [x] **MEMORY-TASK-006: Integrate into main navigation and localization** - ✅ **COMPLETED** - Add route, Russian translations, and "На главную" link
- [x] **MEMORY-TASK-008: Fix mobile responsiveness for GameStats** - ✅ **COMPLETED** - Adjust hearts and stopwatch layout for better mobile view in Memory Grid game
- [x] **MEMORY-TASK-009: Show error count in final dialogue** - ✅ **COMPLETED** - Track total errors (out-of-order and empty clicks) and display them in the result modal
- [x] **MEMORY-TASK-010: Increase UI sizes for mobile** - ✅ **COMPLETED** - Scale up grid cells, font sizes, and buttons for better visibility on iPhone screens

## Multiplication Trainer Mini-Game

Spec: `minigames/multiplication-trainer/multiplication-trainer.md`

- [x] **MULT-TASK-001: Fact catalog and difficulty config** - ✅ **COMPLETED** - 45 normalized facts (`a <= b`), difficulty rules as data, mastery level/color buckets
- [x] **MULT-TASK-002: Progress persistence** - ✅ **COMPLETED** - Versioned localStorage load/save with safe fallback
- [x] **MULT-TASK-003: Answer/distractor generation** - ✅ **COMPLETED** - Plausible distractors for results and factors; equal-pair generation for comparisons
- [x] **MULT-TASK-004: Stages and adaptive selection** - ✅ **COMPLETED** - Stage computation, tier quotas, need weights, error boost, cooldown, injectable RNG
- [x] **MULT-TASK-005: Question generators for 4 exercise types** - ✅ **COMPLETED** - Missing factor, missing result, true/false, which is bigger; answer checking and mastery credit
- [x] **MULT-TASK-006: Session logic** - ✅ **COMPLETED** - 20-question session state, per-answer save, improved-facts summary
- [x] **MULT-TASK-007: Mastery table UI** - ✅ **COMPLETED** - 9×9 table with headers, mirrored colors, legend, fits 375px width
- [x] **MULT-TASK-008: Question and feedback UI** - ✅ **COMPLETED** - Progress counter, answer buttons, correct animation + auto-advance, wrong-answer reveal
- [x] **MULT-TASK-009: Summary screen** - ✅ **COMPLETED** - Score, improved facts, highlighted table, replay/back buttons
- [x] **MULT-TASK-010: Route, Home button, title, docs** - ✅ **COMPLETED** - `/multiplication` route via `GamePageLayout`, Home entry, document title, README/CHANGELOG

## Project Structure & Navigation

- [x] **CORE-TASK-001: Implement routing and landing page** - ✅ **COMPLETED** - Set up react-router-dom, created Home page with links, and moved Coins Shuffler to its own route
- [x] **CORE-TASK-002: Move static assets to public folder** - ✅ **COMPLETED** - Moved august2025 presentation to public folder for static serving
- [x] **CONFIG-TASK-002: Fix TypeScript emit configuration** - ✅ **COMPLETED** - Set noEmit to true and cleaned up generated .js files to prevent duplication
- [x] **CORE-TASK-003: Pre-flight cleanup before the next mini-game** - ✅ **COMPLETED** - Unify game page layout, fix script/doc drift, and fix `index.html` metadata so the next game starts from a clean template (Est: 1.0h)
  1. ✅ Add shared `GamePageLayout` (PageContainer + "🏠 На главную" link) and use it in both game pages; `CoinsShuffler` no longer renders its own `PageContainer`; TextEncoder polyfill moved to `test/setup/jest.setup.ts`
  2. ✅ Add `npm run typecheck` script; drop non-existent `npm run lint` from agent instruction files (ESLint not configured)
  3. ✅ Fix doc drift: memory-grid spec level table, duplicate CHANGELOG `### Added`, wrong "up to 5x7" claim, README paths, obsolete SETUP-TEST-001
  4. ✅ `index.html`: `lang="ru"` and replace missing `/vite.svg` favicon with an inline emoji favicon

## Deployment & CI/CD

- [x] **CONFIG-TASK-003: Configure Vite for production** - ✅ **COMPLETED** - Set explicit base path for custom domain deployment
- [x] **CONFIG-TASK-004: Set up Automated Deployment via GitHub Actions** - ✅ **COMPLETED** - Create workflow for building and deploying to GitHub Pages

## SEO & Titles

- [x] **DOC-TASK-004: Update document titles for RU localization** - ✅ **COMPLETED** - Set global HTML title to «Маша и папа» and per-route titles (home: «Маша и папа», coins shuffler: «Пятнашки с монетами»)

## Task Status Legend

- 🟡 **IN PROGRESS** - Currently being worked on
- ✅ **COMPLETED** - Task finished and verified
- ❌ **BLOCKED** - Task cannot proceed due to dependency or issue
- ⏸️ **ON HOLD** - Task paused for specific reason
- 📋 **NOT STARTED** - Task identified but not yet begun

## Notes

This task list follows the 7-step development workflow. All tasks must be documented here before implementation begins.

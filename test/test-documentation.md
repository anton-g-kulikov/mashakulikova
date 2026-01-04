# mashakulikova Test Documentation

## Test Framework Configuration

**Framework**: Jest + React Testing Library
**Test Command**: `npm test`

## Test Cases

### SETUP-TEST-001: Verify project setup

- **Status**: 📋 NOT STARTED
- **Description**: Verify that metacoding setup is working correctly
- **Expected**: All configuration files are present and valid
- **Test File**: `test/setup.test.js`

### DOC-TEST-001: Verify README.md existence and basic content

- **Status**: ✅ COMPLETED
- **Description**: Ensure the root README.md file exists and contains essential project information
- **Expected**: README.md exists and includes Project Name, Tech Stack, and Setup instructions
- **Test File**: N/A (Manual/File check)

### CONFIG-TEST-001: Verify .gitignore contains standard exclusions

- **Status**: ✅ COMPLETED
- **Description**: Ensure .gitignore includes build outputs, environment files, and logs
- **Expected**: .gitignore contains dist/, .env, and log patterns
- **Test File**: N/A (Manual/File check)

## Coins Shuffler Test Cases

### SHUFFLE-TEST-001: Board Adjacency Logic

- **Status**: ✅ COMPLETED
- **Description**: Verify that the board graph correctly identifies adjacent slots
- **Expected**: Moving from a slot to an adjacent one is allowed; moving to a non-adjacent one is blocked
- **Test File**: `test/unit/shuffle-logic.test.ts`

### SHUFFLE-TEST-002: Valid Move Execution

- **Status**: ✅ COMPLETED
- **Description**: Verify that a coin can move to an adjacent empty slot
- **Expected**: State updates correctly when a valid move is performed
- **Test File**: `test/unit/shuffle-logic.test.ts`

### SHUFFLE-TEST-003: Win Condition Detection

- **Status**: ✅ COMPLETED
- **Description**: Verify that the game detects when all blue coins are on the right and green on the left
- **Expected**: `isWin` state becomes true when goal configuration is reached
- **Test File**: `test/unit/shuffle-logic.test.ts`

### SHUFFLE-TEST-004: Keyboard Navigation Focus

- **Status**: ✅ COMPLETED
- **Description**: Verify that arrow keys move the focus rectangle between slots
- **Expected**: Focus moves correctly in all 4 directions based on board layout
- **Test File**: `test/integration/shuffle-keyboard.test.tsx`

### SHUFFLE-TEST-005: Keyboard Lock-and-Move

- **Status**: ✅ COMPLETED
- **Description**: Verify that Space locks a coin and subsequent arrow keys move it, keeping it locked
- **Expected**: Coin moves to adjacent empty slot when locked; focus follows coin and remains locked until Space is hit again
- **Test File**: `test/integration/shuffle-keyboard.test.tsx`

### SHUFFLE-TEST-006: Touch Dragging

- **Status**: ✅ COMPLETED
- **Description**: Verify that dragging a coin to an adjacent empty slot works
- **Expected**: Coin snaps to the target slot if dragged more than 50% of the way
- **Test File**: `test/integration/shuffle-touch.test.tsx`

### SHUFFLE-TEST-007: Move Counter Logic

- **Status**: ✅ COMPLETED
- **Description**: Verify that the move counter increments correctly for each valid move
- **Expected**: Counter starts at 0 and increases by 1 for every successful coin slide
- **Test File**: `test/unit/shuffle-logic.test.ts`

### SHUFFLE-TEST-008: Finish Screen and Score Display

- **Status**: ✅ COMPLETED
- **Description**: Verify that the finish screen appears on win and displays the final move count
- **Expected**: Finish screen is visible only when `isWin` is true; displays "Congratulations" and the correct final score
- **Test File**: `test/integration/shuffle-ui.test.tsx`

### SHUFFLE-TEST-009: Legend Visibility

- **Status**: ✅ COMPLETED
- **Description**: Verify that the game legend (rules and controls) is visible
- **Expected**: Legend text is present and correctly describes touch and keyboard controls
- **Test File**: `test/integration/shuffle-ui.test.tsx`

### SHUFFLE-TEST-010: Reset Button Functionality

- **Status**: ✅ COMPLETED
- **Description**: Verify that the reset button clears the game state and move counter
- **Expected**: Clicking reset sets moves to 0 and restores initial coin positions
- **Test File**: `test/integration/shuffle-ui.test.tsx`

## Memory Grid Test Cases

### MEMORY-TEST-001: Grid Generation

- **Status**: ✅ COMPLETED
- **Description**: Verify that the grid is generated with the correct dimensions and number of items
- **Expected**: Grid has correct size (e.g., 5x5) and exactly N unique numbers placed randomly
- **Test File**: `test/unit/memory-logic.test.ts`

### MEMORY-TEST-002: State Transitions (Memorize -> Recall)

- **Status**: ✅ COMPLETED
- **Description**: Verify that the game transitions from memorization to recall phase after the timer ends
- **Expected**: `phase` changes from 'memorizing' to 'recalling' and numbers are hidden
- **Test File**: `test/unit/memory-logic.test.ts`

### MEMORY-TEST-003: Correct Sequence Selection

- **Status**: ✅ COMPLETED
- **Description**: Verify that clicking the correct next number in sequence works
- **Expected**: Cell is revealed, `currentExpectedNumber` increments
- **Test File**: `test/unit/memory-logic.test.ts`

### MEMORY-TEST-004: Incorrect Selection and Lives

- **Status**: ✅ COMPLETED
- **Description**: Verify that clicking an incorrect cell reduces lives
- **Expected**: Lives decrease by 1; if lives reach 0, game state becomes 'lost'
- **Test File**: `test/unit/memory-logic.test.ts`

### MEMORY-TEST-005: Win Condition

- **Status**: ✅ COMPLETED
- **Description**: Verify that selecting all numbers in order results in a win
- **Expected**: Game state becomes 'won' after the last number is correctly selected
- **Test File**: `test/unit/memory-logic.test.ts`

### MEMORY-TEST-006: Timer and Stopwatch

- **Status**: 📋 NOT STARTED
- **Description**: Verify that the countdown timer and recall stopwatch work correctly
- **Expected**: Countdown decreases during memorization; stopwatch increases during recall
- **Test File**: `test/integration/memory-ui.test.tsx`

### MEMORY-TEST-008: GameStats Mobile Responsiveness

- **Status**: ✅ COMPLETED
- **Description**: Verify that GameStats component layout is responsive and fits small screens
- **Expected**: Hearts and stopwatch are visible and correctly aligned; no horizontal overflow; layout adapts to narrow viewports
- **Test File**: `test/unit/components/GameStats.test.tsx`

### MEMORY-TEST-009: Error Tracking and Display

- **Status**: ✅ COMPLETED
- **Description**: Verify that the game tracks total errors and displays them in the final dialogue
- **Expected**: `errors` count increments on out-of-order clicks and empty slot clicks; final dialogue shows "Ошибки: N"
- **Test File**: `test/unit/memory-logic.test.ts`

## Deployment Test Cases

### CONFIG-TEST-003: Verify Vite Base Path

- **Status**: ✅ COMPLETED
- **Description**: Ensure `vite.config.ts` has the correct base path for custom domain
- **Expected**: `base: "/"` is present in the config
- **Test File**: N/A (Manual check)

### CONFIG-TEST-004: Verify GitHub Actions Workflow

- **Status**: ✅ COMPLETED
- **Description**: Ensure the deployment workflow is correctly configured
- **Expected**: `.github/workflows/deploy.yml` exists and contains build/deploy steps
- **Test File**: N/A (Manual check)

### CONFIG-TEST-005: SPA fallback routing

- **Status**: ✅ COMPLETED
- **Description**: Verify that GitHub Pages serves the SPA fallback for unknown routes
- **Expected**: Requesting `/memory-grid` or `/coins-shuffler` directly returns `index.html` via 404 fallback script, allowing the React router to render the correct page without 404
- **Test File**: N/A (Manual check / deployment verification)
- **Notes**: `npm run build` output now includes `dist/404.html`, and inspection confirms both redirect scripts are present so GitHub Pages serves the SPA correctly.

### SEO-TEST-001: Document titles localization

- **Status**: ✅ COMPLETED
- **Description**: Verify page titles are localized to Russian for home and Coins Shuffler routes
- **Expected**: Home sets document.title to «Маша и папа»; Coins Shuffler sets document.title to «Пятнашки с монетами»; base HTML title matches «Маша и папа»
- **Test File**: N/A (Manual/React Testing Library check)

### SHUFFLE-TEST-011: Focus and Locked Border Colors

- **Status**: ✅ COMPLETED
- **Description**: Verify that the focus border is yellow and the locked border is violet
- **Expected**: Focused slot has yellow stroke; locked slot has violet stroke
- **Test File**: `test/integration/shuffle-ui.test.tsx`

### SHUFFLE-TEST-012: Touch Drag Sensitivity

- **Status**: ✅ COMPLETED
- **Description**: Verify that the drag threshold is reduced for earlier movement initialization
- **Expected**: Coin moves to adjacent slot with a smaller drag distance (e.g., 25 units instead of 50+ units)
- **Test File**: `test/integration/touch-drag.test.tsx`

### SHUFFLE-TEST-013: Board UI Cleanup

- **Status**: ✅ COMPLETED
- **Description**: Verify that faint slot lines are removed and board border is a single path
- **Expected**: No rects with #333 stroke; board outline is a single path element
- **Test File**: `test/integration/shuffle-ui.test.tsx`

### SHUFFLE-TEST-014: Mobile Rotation

- **Status**: ✅ COMPLETED
- **Description**: Verify that the game field rotates 90 degrees on small screens
- **Expected**: SVG has rotation transform applied when screen width < 480px
- **Test File**: `test/integration/shuffle-ui.test.tsx`

### SHUFFLE-TEST-015: Rotated Input Mapping

- **Status**: ✅ COMPLETED
- **Description**: Verify that touch and keyboard inputs are correctly remapped on mobile
- **Expected**: Screen Down moves coin Board Right; Screen Right moves coin Board Up, etc.
- **Test File**: `test/integration/touch-drag.test.tsx`, `test/integration/shuffle-keyboard.test.tsx`

### SHUFFLE-TEST-016: Tuned Touch Sensitivity

- **Status**: ✅ COMPLETED
- **Description**: Verify that drag threshold is relaxed to allow easier movement
- **Expected**: Dragging 10 units (out of 80) triggers a move
- **Test File**: `test/integration/touch-drag.test.tsx`

### SHUFFLE-TEST-017: Visual Slot Sizing

- **Status**: ✅ COMPLETED
- **Description**: Verify that board is rendered with a connected outline and no gaps
- **Expected**: SVG path defines a continuous board where 80x80 slots touch each other
- **Test File**: N/A (Visual/Code Verification)

### SHUFFLE-TEST-018: Mobile Drag Direction

- **Status**: ✅ COMPLETED
- **Description**: Verify that dragging Screen Down on mobile triggers a move to the slot visually below
- **Expected**: Drag offset {x:0, y:25} triggers move from L2 to C1 (which is visually below L2 in mobile layout)
- **Test File**: `test/integration/touch-drag.test.tsx`

### SHUFFLE-TEST-019: Russian Translation

- **Status**: ✅ COMPLETED
- **Description**: Verify that all UI elements and aria-labels are in Russian
- **Expected**: "Ходы", "Правила", "Начать заново" and other strings are correctly displayed
- **Test File**: `test/integration/shuffle-ui.test.tsx`, `test/integration/touch-drag.test.tsx`

### SHUFFLE-TEST-020: Child-Friendly Design

- **Status**: ✅ COMPLETED
- **Description**: Verify that the design uses a colorful and child-friendly palette
- **Expected**: Background is soft pink, text is dark purple, buttons are rounded and bright
- **Test File**: N/A (Visual/Code Verification)

### SHUFFLE-TEST-021: Tap-to-Select and Move Dots (Touch)

- **Status**: ✅ COMPLETED
- **Description**: Tapping a coin selects it, shows move dots on available adjacent empty slots, tapping a dot moves the coin
- **Expected**: Dots appear only when a coin is selected and disappear after move/cancel; move counter increments after valid move
- **Test File**: `test/integration/touch-drag.test.tsx`

### SHUFFLE-TEST-022: Keyboard Selection Shows Move Dots

- **Status**: ✅ COMPLETED
- **Description**: Selecting a coin via keyboard (Space/Enter) renders move dots for valid adjacent empty slots; dots hide on cancel
- **Expected**: Dots appear after selection, disappear after deselect or move; move counter increments on dot click
- **Test File**: `test/integration/shuffle-keyboard.test.tsx`

### SHUFFLE-TEST-023: Focus stroke thickness by state

- **Status**: ✅ COMPLETED
- **Description**: Verify yellow outline is thick when selected (locked-in) and thinner when only focused
- **Expected**: Selected slot stroke width is 6px; focused-only stroke width is 3px; non-focused/unstyled slots have no stroke
- **Test File**: `test/integration/shuffle-keyboard.test.tsx`

### SHUFFLE-TEST-024: Mouse selection shows thick stroke

- **Status**: ✅ COMPLETED
- **Description**: Click selection should show the thick (6px) yellow outline as it is now "locked-in"
- **Expected**: Before click, focused slot stroke is 3px; after clicking the coin, stroke becomes 6px (selected)
- **Test File**: `test/integration/shuffle-keyboard.test.tsx`

### SHUFFLE-TEST-021: Multi-Level System

- **Status**: ✅ COMPLETED
- **Description**: Verify that the game supports multiple levels with different layouts and win conditions
- **Expected**: Level selection buttons work; board renders correct number of slots and coins for each level (L1:4, L2:7, L3:12, L4:14, L5:10); win condition is level-specific and labels reflect the new order (Клевер → L3, Две башни → L4, Классика → L5)
- **Test File**: `test/integration/shuffle-ui.test.tsx`, `test/unit/shuffle-logic.test.ts`

### SHUFFLE-TEST-025: Enlarged move-dot hit area

- **Status**: ✅ COMPLETED
- **Description**: Ensure move dots remain visually small but expose a larger invisible hit zone so taps/clicks are easier
- **Expected**: Each move dot renders an expanded hit target (e.g., r≥33px) that triggers the move when clicked/tapped
- **Test File**: `test/integration/shuffle-ui.test.tsx`

### SHUFFLE-TEST-026: Level 3 Configuration and Win Condition

- **Status**: ✅ COMPLETED
- **Description**: Verify that Level 3 (The Clover) has correct slots, adjacency, and win condition
- **Expected**: Level 3 is selectable, has 12 slots with loops and a central obstacle, and win condition triggers when coins are swapped
- **Test File**: `test/unit/shuffle-logic.test.ts`

### SHUFFLE-TEST-027: Level 4 Configuration and Win Condition

- **Status**: ✅ COMPLETED
- **Description**: Verify that Level 4 (The Maze) has correct slots, adjacency, and win condition
- **Expected**: Level 4 is selectable, has complex adjacency, and win condition triggers when coins are swapped
- **Test File**: `test/unit/shuffle-logic.test.ts`

### SHUFFLE-TEST-028: Maze top-right downward move

- **Status**: ✅ COMPLETED
- **Description**: Ensure the top-right coin on Level 4 can move downward into the slot directly beneath it once that slot is empty
- **Expected**: After freeing the slot beneath `R1`, `isValidMove` and `moveCoin` allow `R1 → R4`, and UI move dots include `R4` as a target
- **Test File**: `test/unit/shuffle-logic.test.ts`

### SHUFFLE-TEST-029: Level order swap regression

- **Status**: ✅ COMPLETED
- **Description**: Validate that after swapping "Классика" to Level 5 and "Две башни" (ex-"Лабиринт") to Level 4, all logic/tests referencing level IDs still align with the correct configurations
- **Expected**: `getInitialState(4)` loads Maze configuration, `getInitialState(5)` loads Classic configuration, and UI level buttons/rendering follow the new order
- **Test File**: `test/unit/shuffle-logic.test.ts`, `test/integration/shuffle-ui.test.tsx`

### UI-TEST-009: Coins Shuffler stacked layout

- **Status**: ✅ COMPLETED
- **Description**: Ensure the Coins Shuffler page renders the move counter in its own row above the game board, the board in a dedicated row, and the legend/reset controls below the board.
- **Expected**: DOM structure (and visual layout) shows a stacked column: heading → counter card row (full width), board row centered, legend/reset row beneath; responsive layout keeps this order on small screens.
- **Test File**: `test/integration/shuffle-ui.test.tsx`

## UI Test Cases

| Test Case ID | Description                                                           | Type        | Status      |
| :----------- | :-------------------------------------------------------------------- | :---------- | :---------- |
| UI-INT-001   | Page allows vertical scroll while game remains usable                 | Integration | Not Started |
| UI-INT-002   | Horizontal overflow stays hidden after layout change                  | Integration | Not Started |
| UI-INT-003   | Tap-to-select interactions still work with scrolling enabled          | Integration | Not Started |
| UI-INT-004   | August 2025 presentation shows "На главную" link that returns to home | Integration | Not Started |

## Shared UI Components Test Cases

### UI-TEST-001: Button Component

- **Status**: ✅ COMPLETED
- **Description**: Verify that the shared Button component renders correctly and handles clicks
- **Expected**: Button displays text, applies theme styles, and triggers onClick handler
- **Test File**: `test/unit/components/Button.test.tsx`

### UI-TEST-002: Heading Component

- **Status**: ✅ COMPLETED
- **Description**: Verify that the shared Heading component renders with correct styles
- **Expected**: Heading displays text with the defined text-shadow and font
- **Test File**: `test/unit/components/Heading.test.tsx`

### UI-TEST-003: PageContainer Component

- **Status**: ✅ COMPLETED
- **Description**: Verify that the PageContainer provides the correct layout and background
- **Expected**: Renders children within a styled div with theme background and font
- **Test File**: `test/unit/components/PageContainer.test.tsx`

### UI-TEST-007: Mobile Layout Centering

- **Status**: ✅ COMPLETED
- **Description**: Verify that the main page layout is centered and fits within small viewports without horizontal overflow
- **Expected**: PageContainer has reduced padding on small screens; Heading and Button font sizes are appropriate for mobile; No horizontal scrollbar present
- **Test File**: `test/unit/components/*.test.tsx` (Verified via responsive style implementation and unit tests)

### UI-TEST-008: Main Page Button Colors

- **Status**: ✅ COMPLETED
- **Description**: Verify that August 2025 button is pink (primary) and mini-games are green (secondary)
- **Expected**: "Август 2025" button has primary theme color; "Головоломка" and "Запоминалка" have secondary theme color
- **Test File**: `test/integration/home-ui.test.tsx`

## Test Coverage Goals

- Unit Tests: 80%+ coverage for critical functionality
- Integration Tests: Key workflow paths
- End-to-end Tests: User scenarios

## Notes

All test cases must be documented here before test implementation begins, following the TDD approach of the 7-step workflow.

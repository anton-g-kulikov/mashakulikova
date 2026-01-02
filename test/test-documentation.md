# mariyakulikova Test Documentation

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

### SHUFFLE-TEST-021: Multi-Level System

- **Status**: ✅ COMPLETED
- **Description**: Verify that the game supports multiple levels with different layouts and win conditions
- **Expected**: Level selection buttons work; board renders correct number of slots and coins for each level; win condition is level-specific
- **Test File**: `test/integration/shuffle-ui.test.tsx`, `test/unit/shuffle-logic.test.ts`

## Test Coverage Goals

- Unit Tests: 80%+ coverage for critical functionality
- Integration Tests: Key workflow paths
- End-to-end Tests: User scenarios

## Notes

All test cases must be documented here before test implementation begins, following the TDD approach of the 7-step workflow.

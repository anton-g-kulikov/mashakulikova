# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- New mini-game: **Умножайка** (Multiplication Trainer), route `/multiplication`.
  - 9×9 mastery table: each cell shows the result and turns from red to green as correct answers add up (10 correct = mastered); `7×8` and `8×7` share progress.
  - Four exercise types: «Сколько будет?», «Найди множитель», «Верно или нет?», «Что больше?».
  - Adaptive practice: starts with easy facts (×1, ×2, ×5, 3×3, 4×4), gradually mixes in medium and hard ones, and asks poorly known facts more often, with a cooldown so the same fact doesn't repeat back-to-back.
  - Plausible wrong options (neighbouring results like 49 / 56 / 63 for 7×8).
  - No lives: wrong answers show the correct fact and wait for «Дальше».
  - 20-question sessions with a summary of improved facts and the updated table.
  - Progress saved in the browser after every answer.
- **Shared `GamePageLayout`**: every mini-game page now uses one layout (themed page + "🏠 На главную" link), giving new games a ready template.
- **`npm run typecheck`** script; `npm run build` now runs it first.
- **Deployment**: Added GitHub Pages-compatible SPA fallback (history rewrite script + `public/404.html`) so deep links like `/memory-grid` load without 404s.
- **Coins Shuffler**: Added Level 3 ("Клевер") and Level 4 ("Две башни", ранее "Лабиринт") with new board layouts and increased difficulty. Level 3 features a complex clover-like structure with loops and a central obstacle.
- **Coins Shuffler**: Reordered levels for better progression (Clover is Level 3, Maze is Level 4, Classic is Level 5).
- New minigame: **Sequential Memory Grid** (Последовательная память).
  - Grid with numbers to memorize and recall.
  - 3 levels of increasing difficulty.
  - Scoring system: +5 for correct sequence, +1 for out-of-order numbers.
  - Heart system: Hearts are only lost when clicking empty slots.
  - Auto-advance logic: Skips already revealed numbers in the sequence.
  - 1-second delay before showing the result modal to allow viewing the final reveal.
  - Russian localization and "Masha and Papa" theme.
  - Level 1 adjusted to 4x4 grid for easier start.
  - Visual feedback: Correct sequence numbers turn green, out-of-order numbers turn orange.
  - Added "На главную" navigation link to the Memory Grid page.

- **Memory Grid** (continued):
  - 3 difficulty levels (4x4, 5x5, 5x5) with a memorization countdown and a recall stopwatch.
  - Hearts per level: 3, 5 and 7.
  - Mobile-optimized layout.
- **Project Rename**: Updated all project references from `mariyakulikova` to `mashakulikova` to match the new repository name and domain.
- **Design System & Shared Components**:
  - Centralized theme configuration in `src/theme/`.
  - Reusable `Button`, `Heading`, `PageContainer`, and `Card` components.
  - Comprehensive unit tests for all shared components.
- **Automated Deployment**: GitHub Actions workflow for automatic build and deployment to GitHub Pages.
- **Coins Shuffler Mini-Game**: A web-based, mobile-friendly puzzle game.
  - H-shaped board logic with 10 slots and 6 coins.
  - SVG-based game board with smooth animations.
  - Touch/Mouse drag-and-drop support using Framer Motion.
  - Full keyboard accessibility (Arrow keys for focus, Space/Enter for selection).
  - Move counter and game legend.
  - Finish screen with congratulations and final score.
  - Comprehensive test suite (Unit and Integration tests).

### Changed

- **Coins Shuffler page**: uses the shared game layout; removed the nested page container and hardcoded colors (padding is now consistent with Memory Grid).
- **HTML shell**: page language set to Russian (`lang="ru"`); replaced the missing `/vite.svg` favicon with an inline 💜 emoji icon.
- **Tests**: `TextEncoder` polyfill moved into a shared Jest setup file (`test/setup/jest.setup.ts`).
- **Docs**: Memory Grid spec, README project structure and agent command lists now match the code.
- **Memory Grid UI**:
  - Increased grid cell and font sizes for better visibility on mobile devices.
  - Added total error count display in the final result dialogue.
  - Improved mobile responsiveness for `GameStats` (hearts and stopwatch).
  - Implemented responsive grid cell sizes using `clamp` to fit smaller screens.
  - Added `flex-wrap` and responsive padding to game stats container.
- **Shared Components**:
  - Updated `Button` and `Heading` components with larger, more responsive font sizes and padding for mobile.
- **Main Page UI**:
  - Updated button colors: August 2025 is now pink (primary), and mini-games are green (secondary).
- **Mobile Responsiveness**:
  - Improved main page layout for small mobile devices (Android/iOS).
  - Implemented responsive padding in `PageContainer` using `clamp`.
  - Added responsive font sizes for `Heading` and `Button` components.
  - Fixed off-center layout issues on small screens by ensuring proper width and box-sizing.
- **Coins Shuffler Refinements**:
  - Improved keyboard navigation: Coins now remain locked after a move until explicitly unlocked with Space.
  - Enhanced visual feedback: Focus border changed to yellow, locked border changed to violet.
  - Increased touch sensitivity: Coins now trigger movement significantly earlier in the drag process.
  - Added dedicated Reset Button for easier game restarts.
  - Cleaned up Board UI: Removed faint slot grid lines and unified the board border into a single solid path.
  - Restructured in-game layout: Move counter now occupies its own row above the board, the board sits in a dedicated row, and the legend/reset controls stack beneath for clearer hierarchy on all screen sizes.
  - Added Mobile Rotation: The game field now automatically rotates 90 degrees on devices with width < 480px for better portrait orientation fit.
  - Synchronized Rotated Controls: Touch dragging and keyboard navigation are now perfectly remapped to match the visual 90-degree rotation on mobile.
  - **Russian Localization**: Translated the entire game interface, rules, and controls into Russian.
  - **Child-Friendly Redesign**: Updated the visual theme with a colorful palette (lavender/pink), playful fonts, and bright 3D-style buttons.
  - **Multi-Level System**: Introduced a progression system with 5 levels:
    - Уровень 1: Разминка (3 слота, 2 монеты)
    - Уровень 2: Посложнее (5 слотов, 4 монеты)
    - Уровень 3: Клевер (12 слотов, циклические дорожки)
    - Уровень 4: Две башни (14 слотов, два кольца и мосты)
    - Уровень 5: Классика (10 слотов, знакомая «П»-форма)
  - **Dynamic Navigation**: Implemented coordinate-based proximity search for keyboard navigation to support arbitrary level layouts.
  - **Naming Update**: Переименовали уровень 4 из «Лабиринт» в «Две башни», чтобы название отражало конструкцию доски.

### Fixed

- **Coins Shuffler**: Corrected Level 4 ("Две башни", ранее "Лабиринт") adjacency so the top-right coin can move into the slot beneath it when it is empty, adding regression coverage for the scenario.

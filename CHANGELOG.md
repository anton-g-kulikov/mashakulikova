# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Coins Shuffler**: Added Level 4 ("Клевер") and Level 5 ("Лабиринт") with new board layouts and increased difficulty. Level 4 features a complex clover-like structure with loops.
- New minigame: **Sequential Memory Grid** (Последовательная память).
  - 5x5 grid with numbers to memorize and recall.
  - 3 levels of increasing difficulty.
  - Scoring system: +5 for correct sequence, +1 for out-of-order numbers.
  - Heart system: Hearts are only lost when clicking empty slots.
  - Auto-advance logic: Skips already revealed numbers in the sequence.
  - 1-second delay before showing the result modal to allow viewing the final reveal.
  - Russian localization and "Masha and Papa" theme.
  - Level 1 adjusted to 4x4 grid for easier start.
  - Visual feedback: Correct sequence numbers turn green, out-of-order numbers turn orange.
  - Added "На главную" navigation link to the Memory Grid page.

### Added

- **Sequential Memory Grid Mini-Game**: A memory training game where players recall numbered positions.
  - 3 difficulty levels with increasing grid sizes (up to 5x7).
  - Memorization phase with countdown timer.
  - Recall phase with stopwatch and 3-life (hearts) system.
  - Child-friendly visual theme and Russian localization.
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
  - Added Mobile Rotation: The game field now automatically rotates 90 degrees on devices with width < 480px for better portrait orientation fit.
  - Synchronized Rotated Controls: Touch dragging and keyboard navigation are now perfectly remapped to match the visual 90-degree rotation on mobile.
  - **Russian Localization**: Translated the entire game interface, rules, and controls into Russian.
  - **Child-Friendly Redesign**: Updated the visual theme with a colorful palette (lavender/pink), playful fonts, and bright 3D-style buttons.
  - **Multi-Level System**: Introduced a progression system with 3 levels:
    - Уровень 1: Разминка (3 слота, 2 монеты)
    - Уровень 2: Посложнее (5 слотов, 4 монеты)
    - Уровень 3: Классика (10 слотов, 6 монет)
  - **Dynamic Navigation**: Implemented coordinate-based proximity search for keyboard navigation to support arbitrary level layouts.

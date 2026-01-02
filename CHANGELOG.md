# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Coins Shuffler Mini-Game**: A web-based, mobile-friendly puzzle game.
  - H-shaped board logic with 10 slots and 6 coins.
  - SVG-based game board with smooth animations.
  - Touch/Mouse drag-and-drop support using Framer Motion.
  - Full keyboard accessibility (Arrow keys for focus, Space/Enter for selection).
  - Move counter and game legend.
  - Finish screen with congratulations and final score.
  - Comprehensive test suite (Unit and Integration tests).

### Changed

- **Coins Shuffler Refinements**:
  - Improved keyboard navigation: Coins now remain locked after a move until explicitly unlocked with Space.
  - Enhanced visual feedback: Focus border changed to yellow, locked border changed to violet.
  - Increased touch sensitivity: Coins now trigger movement significantly earlier in the drag process.
  - Added dedicated Reset Button for easier game restarts.
  - Cleaned up Board UI: Removed faint slot grid lines and unified the board border into a single solid path.
  - Added Mobile Rotation: The game field now automatically rotates 90 degrees on devices with width < 480px for better portrait orientation fit.
  - Synchronized Rotated Controls: Touch dragging and keyboard navigation are now perfectly remapped to match the visual 90-degree rotation on mobile.

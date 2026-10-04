# mashakulikova

A collection of mini-projects for Masha.

## Tech Stack

- **Frontend:** React, TypeScript
- **Build Tool:** Vite
- **Testing:** Jest, React Testing Library

## Project Structure

- `src/`: Application source.
  - `components/`: Shared UI kit (`Button`, `Card`, `Heading`, `PageContainer`, `GamePageLayout`).
  - `minigames/`: One folder per game (`levels.ts`, `logic.ts`, view components).
    - **Coins Shuffler** (Головоломка): A puzzle game where you swap blue and green coins.
    - **Memory Grid** (Запоминалка): A memory-based number sequencing game.
  - `pages/`: Route-level pages wrapping each game.
  - `theme/`: Colors, fonts, spacing.
- `minigames/`: Game design specs and reference images.
- `public/august2025/`: Static August 2025 presentation and its images.
- `_meta/`: Project task list.
- `test/`: Test documentation, unit and integration tests.

## Getting Started

### Prerequisites

- Node.js (latest LTS recommended)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Testing

```bash
npm test
npm run typecheck
```

## Documentation

Detailed documentation can be found in the `_meta/` directory.

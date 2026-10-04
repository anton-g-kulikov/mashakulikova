# Mini-Game Design Document: Sequential Memory Grid

## 1. Objective
Test and train short-term visual memory by requiring the player to recall and select numbered grid positions in the correct sequence after a brief exposure period.

---

## 2. Core Gameplay
1. A grid is displayed with a subset of cells containing numbers.
2. Numbers are visible for a limited time.
3. All cells are then masked.
4. The player must click the cells that previously contained numbers, **in ascending numerical order**.

---

## 3. Field Configurations
Source of truth: `src/minigames/memory-grid/levels.ts`.

| Level                | Grid Size | Numbers Shown | Memorize Time | Lives |
|----------------------|-----------|---------------|---------------|-------|
| 1: Разминка          | 4×4       | 5             | 10 s          | 3     |
| 2: Посложнее         | 5×5       | 6             | 15 s          | 5     |
| 3: Классика          | 5×5       | 7             | 20 s          | 7     |

---

## 4. Timing Rules
- Numbers are visible for the level's memorize time (countdown shown).
- Masking occurs immediately after the countdown ends; a stopwatch then tracks recall time.

---

## 5. Number Placement
- Numbers are sequential (e.g., 1…N).
- Positions are selected randomly at the start of each round.
- No overlapping cells.
- Each round uses a new random layout.

---

## 6. Player Interaction
- Player clicks on masked cells; every clicked cell is revealed.
- **Correct next number:** green, +5 points, sequence advances (skipping numbers already revealed out of order).
- **Number out of order:** orange, +1 point, counted as an error, no life lost.
- **Empty cell:** counted as an error and costs one heart.

---

## 7. Win / Loss Conditions
- **Win:** all numbered cells are revealed.
- **Loss:** hearts reach zero.
- The result dialog appears after a 1-second delay and shows score, recall time and error count.

---

## 8. Scoring
- +5 for each number found in sequence, +1 for a number found out of order.
- Not implemented (possible extensions): time bonus, perfect-round bonus.

---

## 9. Difficulty Scaling (Optional Extensions)
- Reduced number visibility time.
- Larger grids.
- Non-linear or gapped numbering (e.g., skipping numbers).
- Reverse order mode (highest to lowest).

---

## 10. Technical Notes
- Grid implemented as a 2D array.
- Store a mapping of `number → cell position` before masking.
- Maintain a `currentExpectedNumber` state.
- Optional deterministic random seed for replay or debugging.

---

## 11. Success Criteria
- Rules are immediately understandable without tutorial text.
- Average round duration under 60 seconds.
- Clear visual and audio feedback for correct and incorrect actions.
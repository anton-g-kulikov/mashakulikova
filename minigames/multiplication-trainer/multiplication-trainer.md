# Mini-Game Design Document: Multiplication Trainer (MVP)

## 1. Objective

Make the 9×9 multiplication table automatic for a 3rd-grader. The goal is not to explain multiplication but to have her **recall facts from memory many times** and see her progress across the whole table.

Core loop: **Practice → repetition → mastery → visible green table.**

---

## 2. Facts

- A *fact* is an unordered pair: `2 × 7` and `7 × 2` are the same fact and share progress.
- Stored normalized with `a <= b`. 45 unique facts cover all 81 table cells.
- When asking a question, the factor order is randomly swapped.

### Data model (per fact)

| Field            | Notes                                                       |
| ---------------- | ----------------------------------------------------------- |
| `a`, `b`         | `a <= b`, 1..9                                              |
| `result`         | `a × b`                                                     |
| `difficulty`     | `easy` / `medium` / `hard`, from config (see §3)            |
| `correctCount`   | never decreases                                             |
| `incorrectCount` | never decreases; wrong answers do **not** reset progress    |
| `masteryLevel`   | derived from `correctCount` (see §4), not stored separately |
| `lastAskedAt`    | question index (global counter) when last asked; for cooldown |

---

## 3. Difficulty (config, not UI)

Defined in a data file so it can change later. Classification applies to the specific fact, not the whole multiplier.

| Difficulty | Rule (checked in order)                              | Count |
| ---------- | ---------------------------------------------------- | ----- |
| Easy       | any `×1`, `×2`, `×5`, plus `3×3`, `4×4`              | 26    |
| Medium     | remaining facts containing `×3`, `×4` or `×9`        | 13    |
| Hard       | remaining: `6×6 6×7 6×8 7×7 7×8 8×8`                 | 6     |

---

## 4. Mastery & table colors

A fact is fully mastered at **10 correct answers**.

| correctCount | Level | Color         |
| ------------ | ----- | ------------- |
| 0            | 0     | red           |
| 1–3          | 1     | red-orange    |
| 4–6          | 2     | yellow        |
| 7–9          | 3     | yellow-green  |
| 10+          | 4     | green         |

The main screen shows a 9×9 table (headers 1..9 on both axes). Each cell shows the result (`56` for `7×8`); its color shows mastery. Both mirror cells (`7×8`, `8×7`) always look the same.

---

## 5. Mini-games (exercise types)

| Type             | Prompt            | Answers                         |
| ---------------- | ----------------- | ------------------------------- |
| Missing factor   | `7 × ? = 56`      | 3 options, e.g. `6 8 9`         |
| Missing result   | `7 × 8 = ?`       | 3 options, e.g. `49 56 63`      |
| True / False     | `7 × 8 = 54`      | `Верно` / `Неверно` (~50% true) |
| Which is bigger? | `7 × 6 ? 5 × 8`   | `<` `=` `>`                     |

### Answer generation (distractors)

Always 3 options, one correct, shuffled. Wrong options must be plausible. Preference order:

1. Neighbouring results in the same table: `a×(b±1)`, `(a±1)×b` (for `7×8`: `49`, `63`, `48`, `64`).
2. Results of nearby facts: `a×(b±2)`, `(a±1)×(b±1)`.
3. Small slip of ± one factor.

Rules: positive, unique, ≠ correct answer. Never absurd values (`12 / 56 / 91` is bad).
For *missing factor*: options are nearby factors (`b±1`, `b±2`) within 1..9.
For *True/False*: false statements use the same distractor generator.

### Which is bigger

- Both sides are facts from the currently unlocked difficulty mix; never the same fact twice.
- Prefer close results (difference ≤ ~10) so the answer isn't obvious without computing.
- ~20% of comparisons are deliberately equal (e.g. `2×6 = 3×4`, `3×8 = 4×6`, `4×9 = 6×6`), otherwise `=` would never be correct.
- Both facts go into cooldown.
- **Mastery credit:** a right answer adds +1 correct to *both* facts; a wrong answer adds +1 mistake to both.

---

## 6. Progression (stages)

Stages are computed from current progress, never stored. Because `correctCount` only grows, stages only move forward. "Strong" = `correctCount >= 7` (yellow-green or green).

| Stage | Condition                          | Easy | Medium | Hard |
| ----- | ---------------------------------- | ---- | ------ | ---- |
| 1     | start                              | 100% | 0%     | 0%   |
| 2     | ≥ 5 Easy facts strong              | 70%  | 30%    | 0%   |
| 3     | ≥ 50% of Easy strong (13)          | 30%  | 60%    | 10%  |
| 4     | ≥ 80% of Easy strong (21)          | 15%  | 45%    | 40%  |
| 5     | Stage 4 and ≥ 80% of Medium strong | no tier quota — pick purely by need weight (§7) across all 45 facts |

---

## 7. Adaptive selection

1. Pick a difficulty tier by the stage percentages (skip empty tiers).
2. Within the tier, pick a fact by **need weight**:
   - `base = 11 − min(correctCount, 10)` → unseen fact 11, mastered fact 1 (green facts still come back occasionally for maintenance).
   - `× (1 + incorrectCount / (correctCount + incorrectCount))` → facts with a bad error ratio come more often.
   - `× 3` if the fact was answered wrong earlier in the current session.
3. **Cooldown:** a fact asked in the last 4 questions is excluded (relaxed automatically if the pool would be empty).

Randomness is injectable (`rng` parameter) so selection is deterministic in tests.

---

## 8. Feedback

- **Correct:** short positive animation (~0.6 s), then the next question automatically.
- **Wrong:** highlight the correct answer and show the full fact (`7 × 8 = 56`) with a «Дальше →» button, so she has time to read it. No penalty, no lives, no game over. Error recorded; the fact gets the ×3 boost for the rest of the session.
- Progress is saved after **every** answer, so leaving mid-session loses nothing.

---

## 9. Sessions

- A session is **20 questions** of the one exercise type the child picked.
- Summary screen:
  - number correct out of 20;
  - facts that improved (correctCount went up), highlighting those that changed color;
  - the updated 9×9 table with improved cells highlighted;
  - buttons: «Ещё раз» (same game) and «К таблице».

---

## 10. Persistence

- Stored in `localStorage` under a versioned key (`multiplication-trainer:v1`).
- Corrupt or unavailable storage falls back to empty in-memory progress; it never crashes the app.
- Progress lives on one device/browser.
- Safari may delete site data after ~7 days without a visit. Recommended: add the site to the iPhone/iPad Home Screen and open it from there.

---

## 11. Screens

1. **Main:** title, color legend, 9×9 mastery table, 4 game buttons.
2. **Question:** progress `5 / 20`, prompt, answer buttons, feedback.
3. **Summary:** see §9.

Name: **Умножайка** (Home button «✖️ Умножайка», document title «Умножайка ✖️»). Route: `/multiplication`, page uses the shared `GamePageLayout`.

---

## 12. MVP success criteria

The child can:

1. open the app;
2. see her mastery table;
3. choose one of four mini-games;
4. play a short session;
5. get questions of suitable difficulty;
6. see correct answers gradually turn cells green;
7. get poorly known facts more often than mastered ones.

## 13. Out of scope (MVP)

Tapping table cells, parent statistics view, progress reset, sync between devices, sounds, mixed-type sessions.

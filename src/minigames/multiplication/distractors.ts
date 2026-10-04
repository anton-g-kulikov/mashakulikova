import { MAX_FACTOR, MIN_FACTOR } from "./facts";
import { Rng, shuffle } from "./random";

// Wrong options further than this from the right answer look absurd.
const MAX_RESULT_DISTANCE = 20;

// Takes `count` values from the tiers in order, shuffling within each tier.
function takeFromTiers(tiers: number[][], count: number, rng: Rng): number[] {
  const chosen: number[] = [];
  for (const tier of tiers) {
    for (const value of shuffle(tier, rng)) {
      if (chosen.length === count) return chosen;
      if (!chosen.includes(value)) chosen.push(value);
    }
  }
  return chosen;
}

/**
 * Plausible wrong results for a × b, in order of preference:
 * 1. neighbouring results in the same table: a×(b±1), (a±1)×b
 * 2. results of nearby facts: a×(b±2), (a±2)×b, (a±1)×(b±1)
 * 3. off-by-one/two slips of the result itself (only needed for tiny facts)
 */
export function resultDistractors(a: number, b: number, rng: Rng, count = 2): number[] {
  const r = a * b;
  const tiers = [
    [a * (b - 1), a * (b + 1), (a - 1) * b, (a + 1) * b],
    [
      a * (b - 2),
      a * (b + 2),
      (a - 2) * b,
      (a + 2) * b,
      (a - 1) * (b - 1),
      (a + 1) * (b + 1),
      (a - 1) * (b + 1),
      (a + 1) * (b - 1),
    ],
    [r - 1, r + 1, r - 2, r + 2],
  ].map((tier) =>
    tier.filter((v) => v > 0 && v !== r && Math.abs(v - r) <= MAX_RESULT_DISTANCE)
  );
  return takeFromTiers(tiers, count, rng);
}

/** Plausible wrong factors close to the missing one, within 1..9. */
export function factorDistractors(missing: number, rng: Rng, count = 2): number[] {
  const tiers = [1, 2, 3].map((d) =>
    [missing - d, missing + d].filter((v) => v >= MIN_FACTOR && v <= MAX_FACTOR)
  );
  return takeFromTiers(tiers, count, rng);
}

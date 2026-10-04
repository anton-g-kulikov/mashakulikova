import { DIFFICULTIES, Difficulty, Fact, FACTS } from "./facts";
import { MASTERY_TARGET, STRONG_THRESHOLD } from "./mastery";
import { FactProgress, getFactProgress, Progress } from "./progress";
import { pickWeighted, Rng } from "./random";

export type Stage = 1 | 2 | 3 | 4 | 5;

// Share of questions per difficulty tier. Stage 5 has no quota: need weight only.
export const STAGE_MIX: Record<Exclude<Stage, 5>, Record<Difficulty, number>> = {
  1: { easy: 100, medium: 0, hard: 0 },
  2: { easy: 70, medium: 30, hard: 0 },
  3: { easy: 30, medium: 60, hard: 10 },
  4: { easy: 15, medium: 45, hard: 40 },
};

export const STAGE_THRESHOLDS = {
  stage2StrongEasy: 5, // count
  stage3StrongEasyShare: 0.5,
  stage4StrongEasyShare: 0.8,
  stage5StrongMediumShare: 0.8,
};

export const COOLDOWN = 4; // a fact sits out this many questions after being asked
export const WRONG_IN_SESSION_BOOST = 3;
export const EQUAL_COMPARISON_CHANCE = 0.2;
export const CLOSE_COMPARISON_RANGE = 10;

export interface PickOptions {
  rng: Rng;
  boosted?: ReadonlySet<string>; // facts answered wrong in this session
  exclude?: ReadonlySet<string>;
}

function strongShare(progress: Progress, difficulty: Difficulty) {
  const tier = FACTS.filter((f) => f.difficulty === difficulty);
  const strong = tier.filter(
    (f) => getFactProgress(progress, f.id).correctCount >= STRONG_THRESHOLD
  ).length;
  return { strong, total: tier.length };
}

export function computeStage(progress: Progress): Stage {
  const easy = strongShare(progress, "easy");
  const medium = strongShare(progress, "medium");
  const t = STAGE_THRESHOLDS;

  if (easy.strong >= Math.ceil(easy.total * t.stage4StrongEasyShare)) {
    return medium.strong >= Math.ceil(medium.total * t.stage5StrongMediumShare)
      ? 5
      : 4;
  }
  if (easy.strong >= Math.ceil(easy.total * t.stage3StrongEasyShare)) return 3;
  if (easy.strong >= t.stage2StrongEasy) return 2;
  return 1;
}

/** Tiers that may appear at a stage. */
export function allowedDifficulties(stage: Stage): Difficulty[] {
  if (stage === 5) return DIFFICULTIES;
  return DIFFICULTIES.filter((d) => STAGE_MIX[stage][d] > 0);
}

/** The worse a fact is known, the higher its weight. Mastered facts keep weight 1. */
export function needWeight(fp: FactProgress, boosted: boolean): number {
  const base = MASTERY_TARGET + 1 - Math.min(fp.correctCount, MASTERY_TARGET);
  const attempts = fp.correctCount + fp.incorrectCount;
  const errorFactor = 1 + (attempts > 0 ? fp.incorrectCount / attempts : 0);
  return base * errorFactor * (boosted ? WRONG_IN_SESSION_BOOST : 1);
}

export function isCoolingDown(progress: Progress, id: string): boolean {
  const { lastAskedAt } = getFactProgress(progress, id);
  return lastAskedAt !== null && progress.questionCounter - lastAskedAt <= COOLDOWN;
}

// Drops cooling-down facts unless that would leave nothing to ask.
function withoutCooldown(progress: Progress, pool: Fact[]): Fact[] {
  const fresh = pool.filter((f) => !isCoolingDown(progress, f.id));
  return fresh.length > 0 ? fresh : pool;
}

function weightOf(progress: Progress, boosted?: ReadonlySet<string>) {
  return (f: Fact) => needWeight(getFactProgress(progress, f.id), !!boosted?.has(f.id));
}

export function pickFact(progress: Progress, options: PickOptions): Fact {
  const { rng, boosted, exclude } = options;
  const pool = FACTS.filter((f) => !exclude?.has(f.id));
  let candidates = withoutCooldown(progress, pool);
  if (candidates.length === 0) throw new Error("pickFact: no facts to choose from");

  const stage = computeStage(progress);
  if (stage !== 5) {
    const mix = STAGE_MIX[stage];
    const tiers = DIFFICULTIES.filter(
      (d) => mix[d] > 0 && candidates.some((f) => f.difficulty === d)
    );
    if (tiers.length > 0) {
      const tier = pickWeighted(tiers, (d) => mix[d], rng);
      candidates = candidates.filter((f) => f.difficulty === tier);
    }
  }

  return pickWeighted(candidates, weightOf(progress, boosted), rng);
}

/**
 * Second fact for "which is bigger": from the unlocked tiers, never the same
 * fact, sometimes an equal result (so "=" can be right), otherwise a close one.
 */
export function pickComparisonPartner(
  first: Fact,
  progress: Progress,
  options: PickOptions
): Fact {
  const { rng, boosted } = options;
  const allowed = allowedDifficulties(computeStage(progress));
  const pool = FACTS.filter((f) => f.id !== first.id && allowed.includes(f.difficulty));
  const candidates = withoutCooldown(progress, pool);
  const weight = weightOf(progress, boosted);

  const equal = candidates.filter((f) => f.result === first.result);
  if (equal.length > 0 && rng() < EQUAL_COMPARISON_CHANCE) {
    return pickWeighted(equal, weight, rng);
  }

  const different = candidates.filter((f) => f.result !== first.result);
  const close = different.filter(
    (f) => Math.abs(f.result - first.result) <= CLOSE_COMPARISON_RANGE
  );
  return pickWeighted(close.length > 0 ? close : different, weight, rng);
}

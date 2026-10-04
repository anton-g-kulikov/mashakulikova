import { FACTS, Fact, factId } from "../../../src/minigames/multiplication/facts";
import {
  Progress,
  FactProgress,
} from "../../../src/minigames/multiplication/progress";
import {
  computeStage,
  pickFact,
} from "../../../src/minigames/multiplication/selection";
import { createRng } from "../../../src/minigames/multiplication/random";

const progressWith = (
  facts: Record<string, Partial<FactProgress>>,
  questionCounter = 100
): Progress => ({
  version: 1,
  questionCounter,
  facts: Object.fromEntries(
    Object.entries(facts).map(([id, fp]) => [
      id,
      { correctCount: 0, incorrectCount: 0, lastAskedAt: null, ...fp },
    ])
  ),
});

const strong = (facts: Fact[]) =>
  Object.fromEntries(facts.map((f) => [f.id, { correctCount: 7 }]));

const easy = FACTS.filter((f) => f.difficulty === "easy");
const medium = FACTS.filter((f) => f.difficulty === "medium");

const onlyAllow = (ids: string[]) =>
  new Set(FACTS.map((f) => f.id).filter((id) => !ids.includes(id)));

const countPicks = (
  progress: Progress,
  n: number,
  opts: { exclude?: Set<string>; boosted?: Set<string> } = {}
) => {
  const rng = createRng(42);
  const counts: Record<string, number> = {};
  for (let i = 0; i < n; i++) {
    const f = pickFact(progress, { rng, ...opts });
    counts[f.id] = (counts[f.id] || 0) + 1;
  }
  return counts;
};

describe("MULT-TEST-006: stage computation", () => {
  it.each([
    [0, 0, 1],
    [4, 0, 1],
    [5, 0, 2],
    [12, 0, 2],
    [13, 0, 3],
    [21, 0, 4],
    [21, 10, 4],
    [21, 11, 5],
  ])("%i strong easy + %i strong medium → stage %i", (e, m, stage) => {
    const p = progressWith({
      ...strong(easy.slice(0, e)),
      ...strong(medium.slice(0, m)),
    });
    expect(computeStage(p)).toBe(stage);
  });

  it("does not count facts below 7 correct as strong", () => {
    const p = progressWith(
      Object.fromEntries(easy.map((f) => [f.id, { correctCount: 6 }]))
    );
    expect(computeStage(p)).toBe(1);
  });
});

describe("MULT-TEST-007: adaptive selection", () => {
  it("stage 1 asks only easy facts", () => {
    const counts = countPicks(progressWith({}), 500);
    Object.keys(counts).forEach((id) => {
      expect(FACTS.find((f) => f.id === id)!.difficulty).toBe("easy");
    });
  });

  it("stage 4 mixes all three tiers", () => {
    const counts = countPicks(progressWith(strong(easy.slice(0, 21))), 1000);
    const tiers = new Set(
      Object.keys(counts).map((id) => FACTS.find((f) => f.id === id)!.difficulty)
    );
    expect(tiers).toEqual(new Set(["easy", "medium", "hard"]));
  });

  it("asks unseen facts more often, but still revisits mastered ones", () => {
    const unseen = factId(2, 7);
    const mastered = factId(2, 5);
    const p = progressWith({ [mastered]: { correctCount: 10 } });
    const counts = countPicks(p, 2000, { exclude: onlyAllow([unseen, mastered]) });
    expect(counts[unseen]).toBeGreaterThan(counts[mastered] * 5);
    expect(counts[mastered]).toBeGreaterThan(0);
  });

  it("asks facts with a poor error ratio more often", () => {
    const shaky = factId(2, 7);
    const solid = factId(2, 8);
    const p = progressWith({
      [shaky]: { correctCount: 3, incorrectCount: 3 },
      [solid]: { correctCount: 3, incorrectCount: 0 },
    });
    const counts = countPicks(p, 2000, { exclude: onlyAllow([shaky, solid]) });
    expect(counts[shaky]).toBeGreaterThan(counts[solid] * 1.2);
  });

  it("boosts facts answered wrong in this session", () => {
    const boosted = factId(2, 7);
    const plain = factId(2, 8);
    const counts = countPicks(progressWith({}), 2000, {
      exclude: onlyAllow([boosted, plain]),
      boosted: new Set([boosted]),
    });
    expect(counts[boosted]).toBeGreaterThan(counts[plain] * 2);
  });

  it("skips facts asked in the last 4 questions", () => {
    const justAsked = factId(2, 7); // 1 question ago
    const fourAgo = factId(2, 8); // 4 questions ago
    const fiveAgo = factId(2, 9); // 5 questions ago
    const p = progressWith(
      {
        [justAsked]: { lastAskedAt: 9 },
        [fourAgo]: { lastAskedAt: 6 },
        [fiveAgo]: { lastAskedAt: 5 },
      },
      10
    );
    const counts = countPicks(p, 200, {
      exclude: onlyAllow([justAsked, fourAgo, fiveAgo]),
    });
    expect(Object.keys(counts)).toEqual([fiveAgo]);
  });

  it("relaxes the cooldown when every candidate is cooling down", () => {
    const a = factId(2, 7);
    const b = factId(2, 8);
    const p = progressWith(
      { [a]: { lastAskedAt: 9 }, [b]: { lastAskedAt: 8 } },
      10
    );
    const counts = countPicks(p, 50, { exclude: onlyAllow([a, b]) });
    expect(Object.keys(counts).sort()).toEqual([a, b].sort());
  });
});

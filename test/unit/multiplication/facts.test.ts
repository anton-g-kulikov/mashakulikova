import {
  FACTS,
  factId,
  getFact,
} from "../../../src/minigames/multiplication/facts";
import {
  masteryLevel,
  MASTERY_COLORS,
} from "../../../src/minigames/multiplication/mastery";

describe("MULT-TEST-001: fact catalog", () => {
  it("has 45 unique normalized facts", () => {
    expect(FACTS).toHaveLength(45);
    expect(new Set(FACTS.map((f) => f.id)).size).toBe(45);
    FACTS.forEach((f) => {
      expect(f.a).toBeLessThanOrEqual(f.b);
      expect(f.result).toBe(f.a * f.b);
    });
  });

  it("treats a×b and b×a as the same fact", () => {
    expect(factId(8, 7)).toBe(factId(7, 8));
    expect(getFact(8, 7)).toBe(getFact(7, 8));
    expect(getFact(8, 7)).toMatchObject({ a: 7, b: 8, result: 56 });
  });

  it("splits difficulty 26 / 13 / 6", () => {
    const count = (d: string) => FACTS.filter((f) => f.difficulty === d).length;
    expect(count("easy")).toBe(26);
    expect(count("medium")).toBe(13);
    expect(count("hard")).toBe(6);
  });

  it.each([
    [1, 8, "easy"],
    [2, 7, "easy"],
    [5, 9, "easy"],
    [3, 3, "easy"],
    [4, 4, "easy"],
    [3, 7, "medium"],
    [4, 6, "medium"],
    [4, 8, "medium"],
    [6, 9, "medium"],
    [7, 9, "medium"],
    [6, 6, "hard"],
    [6, 7, "hard"],
    [6, 8, "hard"],
    [7, 7, "hard"],
    [7, 8, "hard"],
    [8, 8, "hard"],
  ])("%i×%i is %s", (a, b, difficulty) => {
    expect(getFact(a, b).difficulty).toBe(difficulty);
  });
});

describe("MULT-TEST-002: mastery levels", () => {
  it.each([
    [0, 0],
    [1, 1],
    [3, 1],
    [4, 2],
    [6, 2],
    [7, 3],
    [9, 3],
    [10, 4],
    [15, 4],
  ])("correctCount %i → level %i", (count, level) => {
    expect(masteryLevel(count)).toBe(level);
  });

  it("has five distinct colors", () => {
    expect(MASTERY_COLORS).toHaveLength(5);
    expect(new Set(MASTERY_COLORS).size).toBe(5);
  });
});

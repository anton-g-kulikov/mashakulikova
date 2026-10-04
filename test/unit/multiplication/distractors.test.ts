import { FACTS } from "../../../src/minigames/multiplication/facts";
import {
  resultDistractors,
  factorDistractors,
} from "../../../src/minigames/multiplication/distractors";
import { createRng } from "../../../src/minigames/multiplication/random";

describe("MULT-TEST-005: distractors", () => {
  it("uses same-table neighbours for 7×8", () => {
    for (let seed = 1; seed <= 20; seed++) {
      const options = resultDistractors(7, 8, createRng(seed));
      expect(options).toHaveLength(2);
      options.forEach((d) => expect([48, 49, 63, 64]).toContain(d));
    }
  });

  it("produces plausible result distractors for every fact", () => {
    FACTS.forEach((fact) => {
      for (let seed = 1; seed <= 10; seed++) {
        const options = resultDistractors(fact.a, fact.b, createRng(seed));
        expect(options).toHaveLength(2);
        expect(new Set(options).size).toBe(2);
        options.forEach((d) => {
          expect(d).toBeGreaterThan(0);
          expect(d).not.toBe(fact.result);
          expect(Math.abs(d - fact.result)).toBeLessThanOrEqual(20);
        });
      }
    });
  });

  it("produces close factor distractors within 1..9", () => {
    for (let missing = 1; missing <= 9; missing++) {
      for (let seed = 1; seed <= 10; seed++) {
        const options = factorDistractors(missing, createRng(seed));
        expect(options).toHaveLength(2);
        expect(new Set(options).size).toBe(2);
        options.forEach((d) => {
          expect(d).toBeGreaterThanOrEqual(1);
          expect(d).toBeLessThanOrEqual(9);
          expect(d).not.toBe(missing);
          expect(Math.abs(d - missing)).toBeLessThanOrEqual(3);
        });
      }
    }
  });
});

import { getFact } from "../../../src/minigames/multiplication/facts";
import { emptyProgress } from "../../../src/minigames/multiplication/progress";
import {
  generateQuestion,
  isCorrect,
  ExerciseType,
  Question,
} from "../../../src/minigames/multiplication/questions";
import { createRng } from "../../../src/minigames/multiplication/random";

const many = (type: ExerciseType, n = 200): Question[] => {
  const rng = createRng(7);
  return Array.from({ length: n }, () =>
    generateQuestion(type, emptyProgress(), { rng })
  );
};

const parseProduct = (text: string) => {
  const m = text.match(/^(\d) × (\d)$/);
  if (!m) throw new Error(`bad expression: ${text}`);
  return [Number(m[1]), Number(m[2])];
};

describe("MULT-TEST-008: question generation", () => {
  it("missing result: a × b = ? with 3 unique options", () => {
    const qs = many("missing-result");
    qs.forEach((q) => {
      const m = q.prompt.match(/^(\d) × (\d) = \?$/);
      expect(m).not.toBeNull();
      const [a, b] = [Number(m![1]), Number(m![2])];
      expect(q.answer).toBe(String(a * b));
      expect(q.options).toHaveLength(3);
      expect(new Set(q.options).size).toBe(3);
      expect(q.options).toContain(q.answer);
      expect(q.factIds).toEqual([getFact(a, b).id]);
      expect(q.reveal).toBe(`${a} × ${b} = ${a * b}`);
    });
  });

  it("varies the factor order", () => {
    const orders = many("missing-result").map((q) => {
      const [a, b] = parseProduct(q.prompt.replace(" = ?", ""));
      return Math.sign(a - b);
    });
    expect(orders).toContain(1);
    expect(orders).toContain(-1);
  });

  it("missing factor: a × ? = r with 3 unique factor options", () => {
    many("missing-factor").forEach((q) => {
      const m = q.prompt.match(/^(\d) × \? = (\d+)$/);
      expect(m).not.toBeNull();
      const [a, r] = [Number(m![1]), Number(m![2])];
      expect(Number(q.answer) * a).toBe(r);
      expect(q.options).toHaveLength(3);
      expect(new Set(q.options).size).toBe(3);
      expect(q.options).toContain(q.answer);
      q.options.forEach((o) => {
        if (o !== q.answer) expect(Number(o) * a).not.toBe(r);
      });
    });
  });

  it("true/false: produces plausible true and false statements", () => {
    const qs = many("true-false");
    const answers = new Set(qs.map((q) => q.answer));
    expect(answers).toEqual(new Set(["Верно", "Неверно"]));
    qs.forEach((q) => {
      expect(q.options).toEqual(["Верно", "Неверно"]);
      const m = q.prompt.match(/^(\d) × (\d) = (\d+)$/);
      expect(m).not.toBeNull();
      const [a, b, shown] = [Number(m![1]), Number(m![2]), Number(m![3])];
      const truth = a * b === shown;
      expect(q.answer).toBe(truth ? "Верно" : "Неверно");
      expect(Math.abs(shown - a * b)).toBeLessThanOrEqual(20);
      expect(q.reveal).toBe(`${a} × ${b} = ${a * b}`);
    });
  });

  it("compare: two different facts with a consistent answer", () => {
    const qs = many("compare", 400);
    qs.forEach((q) => {
      const [left, right] = q.prompt.split(" ? ");
      const [la, lb] = parseProduct(left);
      const [ra, rb] = parseProduct(right);
      const l = la * lb;
      const r = ra * rb;
      expect(q.options).toEqual(["<", "=", ">"]);
      expect(q.answer).toBe(l < r ? "<" : l > r ? ">" : "=");
      expect(q.factIds).toHaveLength(2);
      expect(q.factIds[0]).not.toBe(q.factIds[1]);
      expect(q.reveal).toContain(`${la} × ${lb} = ${l}`);
      expect(q.reveal).toContain(`${ra} × ${rb} = ${r}`);
      // stage 1 → both facts easy
      expect(getFact(la, lb).difficulty).toBe("easy");
      expect(getFact(ra, rb).difficulty).toBe("easy");
    });
    const answers = qs.map((q) => q.answer);
    expect(answers).toContain("=");
    expect(answers).toContain("<");
    expect(answers).toContain(">");
  });

  it("isCorrect checks the chosen option", () => {
    const [q] = many("missing-result", 1);
    expect(isCorrect(q, q.answer)).toBe(true);
    const wrong = q.options.find((o) => o !== q.answer)!;
    expect(isCorrect(q, wrong)).toBe(false);
  });
});

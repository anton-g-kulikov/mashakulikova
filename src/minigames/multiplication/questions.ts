import { Fact } from "./facts";
import { factorDistractors, resultDistractors } from "./distractors";
import { Progress } from "./progress";
import { Rng, shuffle } from "./random";
import { pickComparisonPartner, pickFact } from "./selection";

export type ExerciseType = "missing-factor" | "missing-result" | "true-false" | "compare";

export const EXERCISES: { type: ExerciseType; label: string; example: string }[] = [
  { type: "missing-result", label: "✏️ Сколько будет?", example: "7 × 8 = ?" },
  { type: "missing-factor", label: "🔍 Найди множитель", example: "7 × ? = 56" },
  { type: "true-false", label: "✅ Верно или нет?", example: "7 × 8 = 54" },
  { type: "compare", label: "⚖️ Что больше?", example: "7 × 6 ? 5 × 8" },
];

export const TRUE_LABEL = "Верно";
export const FALSE_LABEL = "Неверно";

export interface Question {
  type: ExerciseType;
  factIds: string[];
  prompt: string;
  options: string[];
  answer: string;
  reveal: string; // the full correct fact(s), shown after a wrong answer
}

export interface QuestionOptions {
  rng: Rng;
  boosted?: ReadonlySet<string>;
}

// Random factor order: 7×8 and 8×7 are the same fact.
function orient(fact: Fact, rng: Rng): [number, number] {
  return rng() < 0.5 ? [fact.a, fact.b] : [fact.b, fact.a];
}

const expr = (x: number, y: number) => `${x} × ${y}`;

export function generateQuestion(
  type: ExerciseType,
  progress: Progress,
  options: QuestionOptions
): Question {
  const { rng } = options;
  const fact = pickFact(progress, options);
  const [x, y] = orient(fact, rng);
  const r = fact.result;
  const reveal = `${expr(x, y)} = ${r}`;

  switch (type) {
    case "missing-factor":
      return {
        type,
        factIds: [fact.id],
        prompt: `${x} × ? = ${r}`,
        options: shuffle([y, ...factorDistractors(y, rng)], rng).map(String),
        answer: String(y),
        reveal,
      };

    case "missing-result":
      return {
        type,
        factIds: [fact.id],
        prompt: `${expr(x, y)} = ?`,
        options: shuffle([r, ...resultDistractors(x, y, rng)], rng).map(String),
        answer: String(r),
        reveal,
      };

    case "true-false": {
      const truthful = rng() < 0.5;
      const shown = truthful ? r : resultDistractors(x, y, rng, 1)[0];
      return {
        type,
        factIds: [fact.id],
        prompt: `${expr(x, y)} = ${shown}`,
        options: [TRUE_LABEL, FALSE_LABEL],
        answer: truthful ? TRUE_LABEL : FALSE_LABEL,
        reveal,
      };
    }

    case "compare": {
      const partner = pickComparisonPartner(fact, progress, options);
      const [left, right] = rng() < 0.5 ? [fact, partner] : [partner, fact];
      const [lx, ly] = orient(left, rng);
      const [rx, ry] = orient(right, rng);
      const answer =
        left.result < right.result ? "<" : left.result > right.result ? ">" : "=";
      return {
        type,
        factIds: [left.id, right.id],
        prompt: `${expr(lx, ly)} ? ${expr(rx, ry)}`,
        options: ["<", "=", ">"],
        answer,
        reveal: `${expr(lx, ly)} = ${left.result}, ${expr(rx, ry)} = ${right.result}`,
      };
    }
  }
}

export function isCorrect(question: Question, choice: string): boolean {
  return question.answer === choice;
}

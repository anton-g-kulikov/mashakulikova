export type Difficulty = "easy" | "medium" | "hard";

export const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

export interface Fact {
  id: string;
  a: number; // always a <= b
  b: number;
  result: number;
  difficulty: Difficulty;
}

export const MIN_FACTOR = 1;
export const MAX_FACTOR = 9;

// Difficulty is data, not UI: rules are checked in order, first match wins,
// anything unmatched is "hard". A fact matches a rule if it contains one of
// the rule's factors or is listed in its explicit facts.
export const DIFFICULTY_RULES: {
  difficulty: Difficulty;
  factors: number[];
  facts: [number, number][];
}[] = [
  { difficulty: "easy", factors: [1, 2, 5], facts: [[3, 3], [4, 4]] },
  { difficulty: "medium", factors: [3, 4, 9], facts: [] },
];

export function factId(x: number, y: number): string {
  return `${Math.min(x, y)}x${Math.max(x, y)}`;
}

export function classifyDifficulty(x: number, y: number): Difficulty {
  const id = factId(x, y);
  const rule = DIFFICULTY_RULES.find(
    (r) =>
      r.factors.includes(x) ||
      r.factors.includes(y) ||
      r.facts.some(([fa, fb]) => factId(fa, fb) === id)
  );
  return rule ? rule.difficulty : "hard";
}

function buildFacts(): Fact[] {
  const facts: Fact[] = [];
  for (let a = MIN_FACTOR; a <= MAX_FACTOR; a++) {
    for (let b = a; b <= MAX_FACTOR; b++) {
      facts.push({
        id: factId(a, b),
        a,
        b,
        result: a * b,
        difficulty: classifyDifficulty(a, b),
      });
    }
  }
  return facts;
}

export const FACTS: readonly Fact[] = buildFacts();

const FACTS_BY_ID = new Map(FACTS.map((f) => [f.id, f]));

export function getFact(x: number, y: number): Fact {
  return getFactById(factId(x, y));
}

export function getFactById(id: string): Fact {
  const fact = FACTS_BY_ID.get(id);
  if (!fact) throw new Error(`Unknown fact: ${id}`);
  return fact;
}

export function isKnownFactId(id: string): boolean {
  return FACTS_BY_ID.has(id);
}

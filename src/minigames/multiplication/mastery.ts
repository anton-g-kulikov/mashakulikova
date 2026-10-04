export const MASTERY_TARGET = 10; // correct answers for a fully green fact
export const STRONG_THRESHOLD = 7; // "strong" fact for stage progression

export type MasteryLevel = 0 | 1 | 2 | 3 | 4;

export function masteryLevel(correctCount: number): MasteryLevel {
  if (correctCount >= MASTERY_TARGET) return 4;
  if (correctCount >= 7) return 3;
  if (correctCount >= 4) return 2;
  if (correctCount >= 1) return 1;
  return 0;
}

// red → red-orange → yellow → yellow-green → green; dark text stays readable on all.
export const MASTERY_COLORS = [
  "#f87171",
  "#fb923c",
  "#facc15",
  "#a3e635",
  "#4ade80",
] as const;

export const MASTERY_TEXT_COLOR = "#1f2937";

export const MASTERY_LABELS = ["0", "1–3", "4–6", "7–9", "10+"] as const;

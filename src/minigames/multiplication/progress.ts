import { isKnownFactId } from "./facts";

export interface FactProgress {
  correctCount: number;
  incorrectCount: number;
  lastAskedAt: number | null; // value of questionCounter when last asked
}

export interface Progress {
  version: 1;
  questionCounter: number; // total questions answered, drives cooldown
  facts: Record<string, FactProgress>;
}

export type StorageLike = Pick<Storage, "getItem" | "setItem">;

export const STORAGE_KEY = "multiplication-trainer:v1";

const EMPTY_FACT: FactProgress = {
  correctCount: 0,
  incorrectCount: 0,
  lastAskedAt: null,
};

export function emptyProgress(): Progress {
  return { version: 1, questionCounter: 0, facts: {} };
}

export function getFactProgress(progress: Progress, id: string): FactProgress {
  return progress.facts[id] ?? EMPTY_FACT;
}

export function recordAnswer(
  progress: Progress,
  factIds: readonly string[],
  correct: boolean
): Progress {
  const facts = { ...progress.facts };
  for (const id of factIds) {
    const fp = getFactProgress(progress, id);
    facts[id] = {
      correctCount: fp.correctCount + (correct ? 1 : 0),
      incorrectCount: fp.incorrectCount + (correct ? 0 : 1),
      lastAskedAt: progress.questionCounter,
    };
  }
  return { ...progress, questionCounter: progress.questionCounter + 1, facts };
}

const isCount = (v: unknown): v is number =>
  typeof v === "number" && Number.isInteger(v) && v >= 0;

function parseFactProgress(raw: unknown): FactProgress | null {
  if (typeof raw !== "object" || raw === null) return null;
  const { correctCount, incorrectCount, lastAskedAt } = raw as Record<string, unknown>;
  if (!isCount(correctCount) || !isCount(incorrectCount)) return null;
  if (lastAskedAt !== null && lastAskedAt !== undefined && !isCount(lastAskedAt)) {
    return null;
  }
  return { correctCount, incorrectCount, lastAskedAt: lastAskedAt ?? null };
}

function defaultStorage(): StorageLike | undefined {
  try {
    return typeof window !== "undefined" ? window.localStorage : undefined;
  } catch {
    return undefined; // access itself can throw when storage is blocked
  }
}

export function loadProgress(storage = defaultStorage()): Progress {
  if (!storage) return emptyProgress();
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    const data = JSON.parse(raw);
    if (data?.version !== 1 || typeof data.facts !== "object" || data.facts === null) {
      return emptyProgress();
    }

    const facts: Record<string, FactProgress> = {};
    for (const [id, value] of Object.entries(data.facts)) {
      const fp = parseFactProgress(value);
      if (fp && isKnownFactId(id)) facts[id] = fp;
    }
    return {
      version: 1,
      questionCounter: isCount(data.questionCounter) ? data.questionCounter : 0,
      facts,
    };
  } catch (error) {
    console.warn("Multiplication trainer: could not load progress", error);
    return emptyProgress();
  }
}

export function saveProgress(progress: Progress, storage = defaultStorage()): void {
  if (!storage) return;
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.warn("Multiplication trainer: could not save progress", error);
  }
}

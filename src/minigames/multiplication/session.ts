import { FACTS } from "./facts";
import { masteryLevel } from "./mastery";
import { getFactProgress, Progress, recordAnswer } from "./progress";
import { ExerciseType, generateQuestion, isCorrect, Question } from "./questions";
import { Rng } from "./random";

export const SESSION_LENGTH = 20;

export interface Session {
  type: ExerciseType;
  answered: number;
  correctAnswers: number;
  boosted: string[]; // facts answered wrong this session
  baseline: Record<string, number>; // correctCount per fact at session start
  question: Question | null;
  finished: boolean;
}

export interface ImprovedFact {
  id: string;
  a: number;
  b: number;
  result: number;
  before: number;
  after: number;
  levelChanged: boolean;
}

export function snapshotCorrectCounts(progress: Progress): Record<string, number> {
  return Object.fromEntries(
    FACTS.map((f) => [f.id, getFactProgress(progress, f.id).correctCount])
  );
}

function nextQuestion(type: ExerciseType, progress: Progress, boosted: string[], rng: Rng) {
  return generateQuestion(type, progress, { rng, boosted: new Set(boosted) });
}

export function startSession(type: ExerciseType, progress: Progress, rng: Rng): Session {
  return {
    type,
    answered: 0,
    correctAnswers: 0,
    boosted: [],
    baseline: snapshotCorrectCounts(progress),
    question: nextQuestion(type, progress, [], rng),
    finished: false,
  };
}

export function answerQuestion(
  session: Session,
  progress: Progress,
  choice: string
): { session: Session; progress: Progress; correct: boolean } {
  const { question } = session;
  if (!question) throw new Error("answerQuestion: no active question");

  const correct = isCorrect(question, choice);
  return {
    correct,
    progress: recordAnswer(progress, question.factIds, correct),
    session: {
      ...session,
      answered: session.answered + 1,
      correctAnswers: session.correctAnswers + (correct ? 1 : 0),
      boosted: correct
        ? session.boosted
        : [...new Set([...session.boosted, ...question.factIds])],
    },
  };
}

export function advanceSession(session: Session, progress: Progress, rng: Rng): Session {
  if (session.answered >= SESSION_LENGTH) {
    return { ...session, question: null, finished: true };
  }
  return {
    ...session,
    question: nextQuestion(session.type, progress, session.boosted, rng),
  };
}

/** Facts whose correctCount rose since the baseline; color changes first. */
export function improvedFacts(
  baseline: Record<string, number>,
  progress: Progress
): ImprovedFact[] {
  const improved = FACTS.flatMap((f) => {
    const before = baseline[f.id] ?? 0;
    const after = getFactProgress(progress, f.id).correctCount;
    if (after <= before) return [];
    return [
      {
        id: f.id,
        a: f.a,
        b: f.b,
        result: f.result,
        before,
        after,
        levelChanged: masteryLevel(before) !== masteryLevel(after),
      },
    ];
  });
  return [
    ...improved.filter((f) => f.levelChanged),
    ...improved.filter((f) => !f.levelChanged),
  ];
}

import { factId } from "../../../src/minigames/multiplication/facts";
import {
  emptyProgress,
  getFactProgress,
  recordAnswer,
  Progress,
} from "../../../src/minigames/multiplication/progress";
import {
  startSession,
  answerQuestion,
  advanceSession,
  improvedFacts,
  snapshotCorrectCounts,
  SESSION_LENGTH,
  Session,
} from "../../../src/minigames/multiplication/session";
import { createRng } from "../../../src/minigames/multiplication/random";

const wrongOption = (s: Session) =>
  s.question!.options.find((o) => o !== s.question!.answer)!;

describe("MULT-TEST-009: session logic", () => {
  it("runs exactly 20 questions and counts correct answers", () => {
    const rng = createRng(3);
    let progress: Progress = emptyProgress();
    let session = startSession("missing-result", progress, rng);
    expect(SESSION_LENGTH).toBe(20);

    let asked = 0;
    while (!session.finished) {
      asked++;
      const choice = asked % 4 === 0 ? wrongOption(session) : session.question!.answer;
      const res = answerQuestion(session, progress, choice);
      expect(res.correct).toBe(asked % 4 !== 0);
      session = advanceSession(res.session, res.progress, rng);
      progress = res.progress;
    }

    expect(asked).toBe(20);
    expect(session.answered).toBe(20);
    expect(session.correctAnswers).toBe(15);
    expect(session.question).toBeNull();
    expect(progress.questionCounter).toBe(20);
  });

  it("credits both facts of a comparison", () => {
    const rng = createRng(5);
    const progress = emptyProgress();
    const session = startSession("compare", progress, rng);
    const res = answerQuestion(session, progress, session.question!.answer);
    session.question!.factIds.forEach((id) => {
      expect(getFactProgress(res.progress, id).correctCount).toBe(1);
    });
  });

  it("boosts facts answered wrong for the rest of the session", () => {
    const rng = createRng(9);
    const progress = emptyProgress();
    const session = startSession("missing-result", progress, rng);
    const res = answerQuestion(session, progress, wrongOption(session));
    expect(res.correct).toBe(false);
    expect(res.session.boosted).toEqual(session.question!.factIds);
    session.question!.factIds.forEach((id) => {
      expect(getFactProgress(res.progress, id).incorrectCount).toBe(1);
    });
  });

  it("lists improved facts and flags color changes", () => {
    const levelUp = factId(3, 4); // 3 → 4 correct: level 1 → 2
    const sameLevel = factId(2, 7); // 1 → 2 correct: stays level 1
    const untouched = factId(5, 5);
    let before = recordAnswer(emptyProgress(), [sameLevel], true);
    for (let i = 0; i < 3; i++) before = recordAnswer(before, [levelUp], true);
    const baseline = snapshotCorrectCounts(before);

    let after = recordAnswer(before, [levelUp, sameLevel], true);
    after = recordAnswer(after, [untouched], false);

    const improved = improvedFacts(baseline, after);
    expect(improved.map((f) => f.id).sort()).toEqual([levelUp, sameLevel].sort());
    expect(improved.find((f) => f.id === levelUp)).toMatchObject({
      before: 3,
      after: 4,
      levelChanged: true,
    });
    expect(improved.find((f) => f.id === sameLevel)).toMatchObject({
      before: 1,
      after: 2,
      levelChanged: false,
    });
    expect(improved[0].id).toBe(levelUp); // color changes listed first
  });
});

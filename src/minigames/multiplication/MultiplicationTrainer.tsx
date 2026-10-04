import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Heading } from "../../components";
import { FACTS } from "./facts";
import { MasteryLegend, MasteryTable } from "./MasteryTable";
import { masteryLevel } from "./mastery";
import { loadProgress, Progress, saveProgress } from "./progress";
import { EXERCISES, ExerciseType } from "./questions";
import { Feedback, QuestionView } from "./QuestionView";
import { Rng } from "./random";
import {
  advanceSession,
  answerQuestion,
  improvedFacts,
  Session,
  SESSION_LENGTH,
  startSession,
} from "./session";
import { SessionSummary } from "./SessionSummary";
import { theme } from "../../theme";

export const CORRECT_ANSWER_DELAY_MS = 700;

interface MultiplicationTrainerProps {
  rng?: Rng;
}

export const MultiplicationTrainer: React.FC<MultiplicationTrainerProps> = ({
  rng = Math.random,
}) => {
  const [progress, setProgress] = useState<Progress>(() => loadProgress());
  const [session, setSession] = useState<Session | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const start = (type: ExerciseType) => {
    setSession(startSession(type, progress, rng));
    setFeedback(null);
  };

  const exitToMenu = () => {
    setSession(null);
    setFeedback(null);
  };

  const answer = (choice: string) => {
    if (!session || feedback) return;
    const result = answerQuestion(session, progress, choice);
    saveProgress(result.progress); // after every answer: leaving mid-session loses nothing
    setProgress(result.progress);
    setSession(result.session);
    setFeedback({ choice, correct: result.correct });
  };

  const goNext = useCallback(() => {
    setSession((s) => (s ? advanceSession(s, progress, rng) : s));
    setFeedback(null);
  }, [progress, rng]);

  // Correct answers move on by themselves; wrong ones wait for «Дальше».
  useEffect(() => {
    if (!feedback?.correct) return;
    const timer = setTimeout(goNext, CORRECT_ANSWER_DELAY_MS);
    return () => clearTimeout(timer);
  }, [feedback, goNext]);

  const masteredCount = useMemo(
    () =>
      FACTS.filter((f) => masteryLevel(progress.facts[f.id]?.correctCount ?? 0) === 4)
        .length,
    [progress]
  );

  if (session?.finished) {
    return (
      <SessionSummary
        correctAnswers={session.correctAnswers}
        total={SESSION_LENGTH}
        improved={improvedFacts(session.baseline, progress)}
        progress={progress}
        onReplay={() => start(session.type)}
        onBack={exitToMenu}
      />
    );
  }

  if (session?.question) {
    return (
      <QuestionView
        question={session.question}
        number={feedback ? session.answered : session.answered + 1}
        total={SESSION_LENGTH}
        feedback={feedback}
        onAnswer={answer}
        onNext={goNext}
        onExit={exitToMenu}
      />
    );
  }

  return (
    <div style={{ width: "100%", maxWidth: "560px", textAlign: "center" }}>
      <Heading>Умножайка ✖️</Heading>
      <p style={{ fontSize: "18px", margin: `0 0 ${theme.spacing.xs}` }}>
        Отвечай правильно — и таблица станет зелёной!
      </p>
      <p style={{ fontSize: "16px", margin: `0 0 ${theme.spacing.sm}`, fontWeight: "bold" }}>
        Выучено: {masteredCount} из {FACTS.length}
      </p>

      <div style={{ marginBottom: theme.spacing.sm }}>
        <MasteryLegend />
      </div>
      <MasteryTable progress={progress} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "14px",
          marginTop: theme.spacing.md,
        }}
      >
        {EXERCISES.map((exercise) => (
          <Button
            key={exercise.type}
            variant="secondary"
            onClick={() => start(exercise.type)}
            style={{ width: "100%" }}
          >
            {exercise.label}
            <span
              style={{ display: "block", fontSize: "15px", fontWeight: "normal", opacity: 0.9 }}
            >
              {exercise.example}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

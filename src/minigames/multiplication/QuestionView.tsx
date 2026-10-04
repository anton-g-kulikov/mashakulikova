import React from "react";
import { Button, Card } from "../../components";
import { ExerciseType, Question } from "./questions";
import { theme } from "../../theme";

export interface Feedback {
  choice: string;
  correct: boolean;
}

const HINTS: Record<ExerciseType, string> = {
  "missing-result": "Сколько будет?",
  "missing-factor": "Какое число пропущено?",
  "true-false": "Это верно?",
  compare: "Поставь знак: <, = или >",
};

const PRAISE = ["Молодец!", "Отлично!", "Супер!", "Верно!"];

const RIGHT_COLOR = "#22c55e";
const RIGHT_SHADOW = "#15803d";
const WRONG_COLOR = "#f87171";
const WRONG_SHADOW = "#dc2626";

interface QuestionViewProps {
  question: Question;
  number: number; // 1-based
  total: number;
  feedback: Feedback | null;
  onAnswer: (choice: string) => void;
  onNext: () => void;
  onExit: () => void;
}

export const QuestionView: React.FC<QuestionViewProps> = ({
  question,
  number,
  total,
  feedback,
  onAnswer,
  onNext,
  onExit,
}) => {
  const optionStyle = (option: string): React.CSSProperties => {
    const base: React.CSSProperties = {
      minWidth: "clamp(80px, 24vw, 120px)",
      fontSize: "clamp(24px, 7vw, 34px)",
      padding: "14px 18px",
    };
    if (!feedback) return base;
    if (option === question.answer) {
      return { ...base, backgroundColor: RIGHT_COLOR, boxShadow: `0 4px 0 ${RIGHT_SHADOW}` };
    }
    if (option === feedback.choice) {
      return { ...base, backgroundColor: WRONG_COLOR, boxShadow: `0 4px 0 ${WRONG_SHADOW}` };
    }
    return { ...base, opacity: 0.5 };
  };

  return (
    <div style={{ width: "100%", maxWidth: "560px", textAlign: "center" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: theme.spacing.xs,
        }}
      >
        <button
          type="button"
          onClick={onExit}
          style={{
            background: "none",
            border: "none",
            color: theme.colors.text,
            fontFamily: theme.fonts.main,
            fontSize: "16px",
            cursor: "pointer",
            padding: "4px 0",
          }}
        >
          ← К таблице
        </button>
        <div style={{ fontSize: "18px", fontWeight: "bold" }}>{`${number} / ${total}`}</div>
      </div>

      <div
        aria-hidden="true"
        style={{
          height: "10px",
          borderRadius: "5px",
          backgroundColor: theme.colors.shadow,
          overflow: "hidden",
          marginBottom: theme.spacing.md,
        }}
      >
        <div
          style={{
            width: `${((number - 1) / total) * 100}%`,
            height: "100%",
            backgroundColor: theme.colors.secondary,
            transition: "width 0.3s",
          }}
        />
      </div>

      <Card key={number} className="mult-pop" style={{ marginBottom: theme.spacing.md }}>
        <div style={{ fontSize: "18px", marginBottom: theme.spacing.xs }}>
          {HINTS[question.type]}
        </div>
        <div
          data-testid="prompt"
          style={{
            fontSize: "clamp(26px, 9.5vw, 60px)",
            fontWeight: "bold",
            color: theme.colors.text,
            whiteSpace: "nowrap",
          }}
        >
          {question.prompt}
        </div>
      </Card>

      <div
        style={{
          display: "flex",
          gap: "14px",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: theme.spacing.md,
        }}
      >
        {question.options.map((option) => (
          <Button
            key={option}
            data-testid="answer-option"
            variant="secondary"
            disabled={feedback !== null}
            onClick={() => onAnswer(option)}
            style={optionStyle(option)}
          >
            {option}
          </Button>
        ))}
      </div>

      <div aria-live="polite" style={{ minHeight: "110px" }}>
        {feedback?.correct && (
          <div
            data-testid="feedback-correct"
            className="mult-pop"
            style={{ fontSize: "28px", fontWeight: "bold", color: RIGHT_SHADOW }}
          >
            🎉 {PRAISE[number % PRAISE.length]}
          </div>
        )}
        {feedback && !feedback.correct && (
          <div data-testid="feedback-wrong" className="mult-pop">
            <div style={{ fontSize: "18px" }}>Почти! Запомни:</div>
            <div
              data-testid="reveal"
              style={{
                fontSize: "clamp(22px, 6vw, 30px)",
                fontWeight: "bold",
                margin: "6px 0 14px",
              }}
            >
              {question.reveal}
            </div>
            <Button onClick={onNext}>Дальше →</Button>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useMemo } from "react";
import { Button, Card, Heading } from "../../components";
import { MasteryLegend, MasteryTable } from "./MasteryTable";
import { masteryLevel, MASTERY_COLORS, MASTERY_TEXT_COLOR } from "./mastery";
import { Progress } from "./progress";
import { ImprovedFact } from "./session";
import { theme } from "../../theme";

interface SessionSummaryProps {
  correctAnswers: number;
  total: number;
  improved: ImprovedFact[];
  progress: Progress;
  onReplay: () => void;
  onBack: () => void;
}

export const SessionSummary: React.FC<SessionSummaryProps> = ({
  correctAnswers,
  total,
  improved,
  progress,
  onReplay,
  onBack,
}) => {
  const highlight = useMemo(() => new Set(improved.map((f) => f.id)), [improved]);

  return (
    <div style={{ width: "100%", maxWidth: "560px", textAlign: "center" }}>
      <Heading>Готово! 🎉</Heading>
      <Card style={{ marginBottom: theme.spacing.md }}>
        <div
          data-testid="summary-score"
          style={{ fontSize: "28px", fontWeight: "bold", color: theme.colors.primary }}
        >
          ⭐ Правильно: {correctAnswers} из {total}
        </div>

        <div data-testid="improved-facts" style={{ marginTop: theme.spacing.sm }}>
          {improved.length === 0 ? (
            <p style={{ margin: 0 }}>В этот раз клетки не поменялись — попробуй ещё!</p>
          ) : (
            <>
              <p style={{ margin: "0 0 8px" }}>Стало лучше:</p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                {improved.map((f) => (
                  <span
                    key={f.id}
                    title={`правильных: ${f.before} → ${f.after}`}
                    style={{
                      padding: "4px 10px",
                      borderRadius: "12px",
                      fontWeight: "bold",
                      backgroundColor: MASTERY_COLORS[masteryLevel(f.after)],
                      color: MASTERY_TEXT_COLOR,
                    }}
                  >
                    {f.a} × {f.b}
                    {f.levelChanged ? " ⬆️" : ""}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </Card>

      <div style={{ marginBottom: theme.spacing.sm }}>
        <MasteryLegend />
      </div>
      <MasteryTable progress={progress} highlight={highlight} />

      <div
        style={{
          display: "flex",
          gap: "14px",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: theme.spacing.md,
        }}
      >
        <Button onClick={onReplay}>🔁 Ещё раз</Button>
        <Button variant="secondary" onClick={onBack}>
          📊 К таблице
        </Button>
      </div>
    </div>
  );
};

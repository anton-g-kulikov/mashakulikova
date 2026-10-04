import React from "react";
import { getFact, MAX_FACTOR, MIN_FACTOR } from "./facts";
import {
  masteryLevel,
  MASTERY_COLORS,
  MASTERY_LABELS,
  MASTERY_TEXT_COLOR,
} from "./mastery";
import { getFactProgress, Progress } from "./progress";
import { theme } from "../../theme";

const FACTORS = Array.from(
  { length: MAX_FACTOR - MIN_FACTOR + 1 },
  (_, i) => MIN_FACTOR + i
);

const headerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  color: theme.colors.heading,
  fontSize: "clamp(12px, 3.4vw, 18px)",
};

interface MasteryTableProps {
  progress: Progress;
  highlight?: ReadonlySet<string>;
}

export const MasteryTable: React.FC<MasteryTableProps> = ({ progress, highlight }) => {
  return (
    <div
      role="group"
      aria-label="Таблица умножения"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${FACTORS.length + 1}, 1fr)`,
        gap: "3px",
        width: "100%",
        maxWidth: "460px",
        margin: "0 auto",
        fontFamily: theme.fonts.main,
      }}
    >
      <div aria-hidden="true" style={headerStyle}>
        ×
      </div>
      {FACTORS.map((col) => (
        <div key={`col-${col}`} data-testid={`col-header-${col}`} style={headerStyle}>
          {col}
        </div>
      ))}

      {FACTORS.map((row) => (
        <React.Fragment key={`row-${row}`}>
          <div data-testid={`row-header-${row}`} style={headerStyle}>
            {row}
          </div>
          {FACTORS.map((col) => {
            const fact = getFact(row, col);
            const { correctCount } = getFactProgress(progress, fact.id);
            const level = masteryLevel(correctCount);
            const highlighted = highlight?.has(fact.id);
            return (
              <div
                key={`${row}-${col}`}
                data-testid={`cell-${row}-${col}`}
                data-level={level}
                data-highlighted={highlighted ? "true" : undefined}
                className={highlighted ? "mult-highlight" : undefined}
                aria-label={`${row} × ${col} = ${fact.result}, правильных ответов: ${correctCount}`}
                title={`${row} × ${col} = ${fact.result} · правильных: ${correctCount}`}
                style={{
                  aspectRatio: "1 / 1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "6px",
                  backgroundColor: MASTERY_COLORS[level],
                  color: MASTERY_TEXT_COLOR,
                  fontWeight: "bold",
                  fontSize: "clamp(11px, 3.2vw, 17px)",
                  boxShadow: highlighted
                    ? `0 0 0 3px ${theme.colors.text}`
                    : "inset 0 -2px 0 rgba(0,0,0,0.08)",
                }}
              >
                {fact.result}
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export const MasteryLegend: React.FC = () => (
  <div
    data-testid="mastery-legend"
    style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      gap: "6px 12px",
      fontSize: "14px",
      color: theme.colors.text,
    }}
  >
    <span>Правильных ответов:</span>
    {MASTERY_LABELS.map((label, level) => (
      <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
        <span
          aria-hidden="true"
          style={{
            width: "14px",
            height: "14px",
            borderRadius: "4px",
            backgroundColor: MASTERY_COLORS[level],
          }}
        />
        <span>{label}</span>
      </span>
    ))}
  </div>
);

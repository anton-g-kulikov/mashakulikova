import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  MasteryTable,
  MasteryLegend,
} from "../../../src/minigames/multiplication/MasteryTable";
import { factId } from "../../../src/minigames/multiplication/facts";
import { MASTERY_COLORS } from "../../../src/minigames/multiplication/mastery";
import {
  emptyProgress,
  recordAnswer,
} from "../../../src/minigames/multiplication/progress";

const cell = (row: number, col: number) => screen.getByTestId(`cell-${row}-${col}`);

describe("MULT-TEST-010: mastery table", () => {
  it("renders 81 cells showing results, plus 1..9 headers", () => {
    render(<MasteryTable progress={emptyProgress()} />);
    expect(screen.getAllByTestId(/^cell-\d-\d$/)).toHaveLength(81);
    expect(cell(7, 8)).toHaveTextContent("56");
    expect(cell(7, 8)).toHaveAttribute("aria-label", expect.stringContaining("7 × 8 = 56"));
    for (let i = 1; i <= 9; i++) {
      expect(screen.getByTestId(`row-header-${i}`)).toHaveTextContent(String(i));
      expect(screen.getByTestId(`col-header-${i}`)).toHaveTextContent(String(i));
    }
  });

  it("colors cells by mastery and mirrors a×b / b×a", () => {
    let p = emptyProgress();
    for (let i = 0; i < 4; i++) p = recordAnswer(p, [factId(7, 8)], true);
    render(<MasteryTable progress={p} />);
    expect(cell(7, 8)).toHaveAttribute("data-level", "2");
    expect(cell(8, 7)).toHaveAttribute("data-level", "2");
    expect(cell(7, 8)).toHaveStyle({ backgroundColor: MASTERY_COLORS[2] });
    expect(cell(8, 7)).toHaveStyle({ backgroundColor: MASTERY_COLORS[2] });
    expect(cell(2, 2)).toHaveAttribute("data-level", "0");
    expect(cell(2, 2)).toHaveStyle({ backgroundColor: MASTERY_COLORS[0] });
  });

  it("marks highlighted facts in both mirror cells", () => {
    render(
      <MasteryTable progress={emptyProgress()} highlight={new Set([factId(3, 6)])} />
    );
    expect(cell(3, 6)).toHaveAttribute("data-highlighted", "true");
    expect(cell(6, 3)).toHaveAttribute("data-highlighted", "true");
    expect(cell(3, 7)).not.toHaveAttribute("data-highlighted");
  });

  it("legend shows the five mastery levels", () => {
    render(<MasteryLegend />);
    const legend = screen.getByTestId("mastery-legend");
    ["0", "1–3", "4–6", "7–9", "10+"].forEach((label) =>
      expect(within(legend).getByText(label)).toBeInTheDocument()
    );
  });
});

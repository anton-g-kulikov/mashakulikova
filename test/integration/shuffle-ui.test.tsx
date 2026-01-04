import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CoinsShuffler } from "../../src/minigames/coins-shuffler/CoinsShuffler";

describe("Coins Shuffler UI", () => {
  test("SHUFFLE-TEST-009: Legend Visibility", () => {
    render(<CoinsShuffler />);
    expect(screen.getByText(/Правила/i)).toBeInTheDocument();
    expect(screen.getByText(/Управление/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Поменяй местами синие и зеленые монеты/i)
    ).toBeInTheDocument();
  });

  test("Initial Move Counter is 0", () => {
    render(<CoinsShuffler />);
    expect(screen.getByText(/Ходы: 0/i)).toBeInTheDocument();
  });

  test("Board renders correct number of slots for Level 1", () => {
    const { container } = render(<CoinsShuffler />);
    // Level 1 has 4 slots (S1, S2, S3, P1)
    const slots = container.querySelectorAll('[data-testid^="slot-"]');
    expect(slots.length).toBe(4);
  });

  test("Level selection changes board", () => {
    const { container } = render(<CoinsShuffler />);

    // Click Level 2 button
    const level2Button = screen.getByRole("button", { name: /Уровень 2/i });
    fireEvent.click(level2Button);

    // Level 2 has 7 slots (S1-S5, P1, P2)
    const slots2 = container.querySelectorAll('[data-testid^="slot-"]');
    expect(slots2.length).toBe(7);
    expect(screen.getByText(/Посложнее/i)).toBeInTheDocument();

    // Click Level 3 button
    const level3Button = screen.getByRole("button", { name: /Уровень 3/i });
    fireEvent.click(level3Button);

    // Level 3 (Клевер) has 12 slots
    const slots3 = container.querySelectorAll('[data-testid^="slot-"]');
    expect(slots3.length).toBe(12);
    expect(screen.getByText(/Клевер/i)).toBeInTheDocument();

    // Click Level 4 button
    const level4Button = screen.getByRole("button", { name: /Уровень 4/i });
    fireEvent.click(level4Button);

    // Level 4 (Две башни) has 14 slots
    const slots4 = container.querySelectorAll('[data-testid^="slot-"]');
    expect(slots4.length).toBe(14);
    expect(screen.getByText(/Две башни/i)).toBeInTheDocument();

    // Click Level 5 button
    const level5Button = screen.getByRole("button", { name: /Уровень 5/i });
    fireEvent.click(level5Button);

    // Level 5 (Классика) has 10 slots
    const slots5 = container.querySelectorAll('[data-testid^="slot-"]');
    expect(slots5.length).toBe(10);
    expect(screen.getByText(/Классика/i)).toBeInTheDocument();
  });

  test("SHUFFLE-TEST-010: Reset Button Functionality", () => {
    render(<CoinsShuffler />);

    // Level 1: S1 has coin, S2 is empty. Move S1 -> S2.
    // Initial focus is S1.
    fireEvent.keyDown(window, { key: " " }); // Lock S1
    fireEvent.keyDown(window, { key: "ArrowRight" }); // Move to S2

    expect(screen.getByText(/Ходы: 1/i)).toBeInTheDocument();

    // Click Reset
    const resetButton = screen.getByRole("button", { name: /Начать заново/i });
    fireEvent.click(resetButton);

    // Verify moves reset to 0
    expect(screen.getByText(/Ходы: 0/i)).toBeInTheDocument();
  });

  test("SHUFFLE-TEST-025: Move dot has enlarged hit area", () => {
    render(<CoinsShuffler />);

    // Select the initial blue coin on Level 1 to show move dots
    const coinS1 = screen.getByLabelText(/синяя монета в S1/i);
    fireEvent.click(coinS1);

    const enlargedHit = screen.getByTestId("move-dot-hit-S2");
    expect(enlargedHit).toBeInTheDocument();
    expect(enlargedHit).toHaveAttribute("r", "33");

    // Clicking the enlarged hit target should perform the move and increment counter
    fireEvent.click(enlargedHit);
    expect(screen.getByText(/Ходы: 1/i)).toBeInTheDocument();
  });

  test("SHUFFLE-TEST-014: Mobile Rotation (Level 1)", () => {
    // Mock window.innerWidth
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 375,
    });

    render(<CoinsShuffler />);

    // Level 1 desktop is 260x180. Mobile should be 180x260.
    const svg = screen
      .getByRole("img", { name: /синяя монета в S1/i })
      .closest("svg");
    expect(svg).toHaveAttribute("width", "180");
    expect(svg).toHaveAttribute("height", "260");
  });
});

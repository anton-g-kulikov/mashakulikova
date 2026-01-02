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
    // Level 1 has 3 slots
    const slots = container.querySelectorAll('[data-testid^="slot-"]');
    expect(slots.length).toBe(3);
  });

  test("Level selection changes board", () => {
    const { container } = render(<CoinsShuffler />);
    
    // Click Level 3 button
    const level3Button = screen.getByRole("button", { name: /Уровень 3/i });
    fireEvent.click(level3Button);

    // Level 3 has 10 slots
    const slots = container.querySelectorAll('[data-testid^="slot-"]');
    expect(slots.length).toBe(10);
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

  test("SHUFFLE-TEST-014: Mobile Rotation (Level 1)", () => {
    // Mock window.innerWidth
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 375,
    });

    render(<CoinsShuffler />);

    // Level 1 desktop is 260x100. Mobile should be 100x260.
    const svg = screen
      .getByRole("img", { name: /синяя монета в S1/i })
      .closest("svg");
    expect(svg).toHaveAttribute("width", "100");
    expect(svg).toHaveAttribute("height", "260");
  });
});

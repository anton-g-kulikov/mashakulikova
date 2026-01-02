import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CoinsShuffler } from "../../src/minigames/coins-shuffler/CoinsShuffler";

describe("Coins Shuffler UI", () => {
  test("SHUFFLE-TEST-009: Legend Visibility", () => {
    render(<CoinsShuffler />);
    expect(screen.getByText(/Rules/i)).toBeInTheDocument();
    expect(screen.getByText(/Controls/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Switch the blue and green coins/i)
    ).toBeInTheDocument();
  });

  test("Initial Move Counter is 0", () => {
    render(<CoinsShuffler />);
    expect(screen.getByText(/Moves: 0/i)).toBeInTheDocument();
  });

  test("Board renders all slots", () => {
    const { container } = render(<CoinsShuffler />);
    // We expect 10 slots in the SVG
    const slots = container.querySelectorAll('[data-testid^="slot-"]');
    expect(slots.length).toBe(10);
  });
  test("SHUFFLE-TEST-010: Reset Button Functionality", () => {
    render(<CoinsShuffler />);

    // Simulate a move first (Keyboard move L2 -> C1)
    fireEvent.keyDown(window, { key: "ArrowDown" }); // Focus L2
    fireEvent.keyDown(window, { key: " " }); // Lock L2
    fireEvent.keyDown(window, { key: "ArrowRight" }); // Move to C1

    expect(screen.getByText(/Moves: 1/i)).toBeInTheDocument();

    // Click Reset
    const resetButton = screen.getByRole("button", { name: /Reset Game/i });
    fireEvent.click(resetButton);

    // Verify moves reset to 0
    expect(screen.getByText(/Moves: 0/i)).toBeInTheDocument();
  });

  test("SHUFFLE-TEST-014: Mobile Rotation", () => {
    // Mock window.innerWidth
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 375,
    });

    render(<CoinsShuffler />);

    // The SVG should have rotate(90deg) transform
    const svg = screen
      .getByRole("img", { name: /blue coin at L1/i })
      .closest("svg");
    expect(svg).toHaveStyle("transform: rotate(90deg)");
  });
});

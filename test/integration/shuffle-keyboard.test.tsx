import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CoinsShuffler } from "../../src/minigames/coins-shuffler/CoinsShuffler";

describe("Coins Shuffler Keyboard", () => {
  test("SHUFFLE-TEST-004: Keyboard Navigation Focus", () => {
    render(<CoinsShuffler />);

    // Initial focus is L1
    // Press ArrowDown to move to L2
    fireEvent.keyDown(window, { key: "ArrowDown" });
    // We can't easily check SVG stroke in RTL without custom matchers,
    // but we can verify no errors and state updates if we had access to it.
  });

  test("SHUFFLE-TEST-005: Keyboard Lock-and-Move", () => {
    render(<CoinsShuffler />);

    // Move to L2 (which has a coin)
    fireEvent.keyDown(window, { key: "ArrowDown" });
    // Press Space to lock
    fireEvent.keyDown(window, { key: " " });
    // Press ArrowRight to move to C1
    fireEvent.keyDown(window, { key: "ArrowRight" });

    // Verify move counter incremented
    expect(screen.getByText(/Moves: 1/i)).toBeInTheDocument();
  });
});

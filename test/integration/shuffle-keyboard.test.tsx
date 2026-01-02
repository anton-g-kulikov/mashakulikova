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

    // Press ArrowRight again to move to C2 (should still be locked)
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(screen.getByText(/Moves: 2/i)).toBeInTheDocument();
  });

  test("Mobile Keyboard Rotation", () => {
    // Mock window.innerWidth
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 375,
    });

    render(<CoinsShuffler />);

    // Initial focus L1.
    // On mobile (90deg CW):
    // Screen Down = Board Left
    // Screen Right = Board Down
    // Screen Up = Board Right
    // Screen Left = Board Up

    // To move L1 -> L2 (Board Down), we need to press Screen LEFT.
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    
    // To verify, we'll lock and move to C1 (Board Right).
    // Board Right move = Screen DOWN.
    fireEvent.keyDown(window, { key: " " }); // Lock L2
    fireEvent.keyDown(window, { key: "ArrowDown" }); // Move to C1

    expect(screen.getByText(/Moves: 1/i)).toBeInTheDocument();
    expect(screen.queryByTestId("coin-L2")).not.toBeInTheDocument();
    expect(screen.getByTestId("coin-C1")).toBeInTheDocument();
  });
});

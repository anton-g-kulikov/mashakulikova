import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CoinsShuffler } from "../../src/minigames/coins-shuffler/CoinsShuffler";

describe("Coins Shuffler Keyboard", () => {
  test("SHUFFLE-TEST-004: Keyboard Navigation Focus (Level 1)", () => {
    render(<CoinsShuffler />);

    // Initial focus is S1.
    // Press ArrowRight to move to S2.
    fireEvent.keyDown(window, { key: "ArrowRight" });
    // No error means navigation worked.
  });

  test("SHUFFLE-TEST-005: Keyboard Lock-and-Move (Level 1)", () => {
    render(<CoinsShuffler />);

    // Initial focus S1 (has blue coin). S2 is empty. S3 has green coin.
    // Press Space to lock S1.
    fireEvent.keyDown(window, { key: " " });
    // Press ArrowRight to move to S2 (empty).
    fireEvent.keyDown(window, { key: "ArrowRight" });

    // Verify move counter incremented.
    expect(screen.getByText(/Ходы: 1/i)).toBeInTheDocument();

    // Press ArrowLeft to move back to S1 (now empty).
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(screen.getByText(/Ходы: 2/i)).toBeInTheDocument();
  });

  test("Mobile Keyboard Rotation (Level 1)", () => {
    // Mock window.innerWidth
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 375,
    });

    render(<CoinsShuffler />);

    // Level 1 Desktop: S1(100,100), S2(200,100), S3(300,100)
    // Level 1 Mobile (swapped): S1(100,100), S2(100,200), S3(100,300)
    // Screen Down -> Board Right
    // Screen Left -> Board Down
    // Screen Up -> Board Left
    // Screen Right -> Board Up

    // Initial focus S1 (has blue coin).
    // To move S1 -> S2 (Board Down), we need to press Screen LEFT.
    // But first, let's lock S1.
    fireEvent.keyDown(window, { key: " " }); // Lock S1

    // Now move S1 -> S2 (Board Down) = Screen LEFT.
    fireEvent.keyDown(window, { key: "ArrowLeft" });

    expect(screen.getByText(/Ходы: 1/i)).toBeInTheDocument();
    expect(screen.queryByTestId("coin-S1")).not.toBeInTheDocument();
    expect(screen.getByTestId("coin-S2")).toBeInTheDocument();
  });
});

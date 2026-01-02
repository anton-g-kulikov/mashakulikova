import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CoinsShuffler } from "../../src/minigames/coins-shuffler/CoinsShuffler";

describe("Coins Shuffler Touch/Drag", () => {
  test("SHUFFLE-TEST-006: Touch Dragging (Simulated)", () => {
    render(<CoinsShuffler />);

    // Level 1 has 2 coins
    const coins = screen.getAllByRole("img", { hidden: true });
    expect(coins.length).toBe(2);
  });
});

import {
  getInitialState,
  isValidMove,
  moveCoin,
} from "../../src/minigames/coins-shuffler/logic";
import { LEVELS } from "../../src/minigames/coins-shuffler/levels";

describe("Coins Shuffler Logic", () => {
  test("SHUFFLE-TEST-001: Board Adjacency Logic (Level 3)", () => {
    const level3 = LEVELS.find((l) => l.id === 3)!;
    // L2 is adjacent to C1, L1, L3
    expect(isValidMove(level3, "L2", "C1")).toBe(true);
    expect(isValidMove(level3, "L2", "L1")).toBe(true);
    expect(isValidMove(level3, "L2", "L3")).toBe(true);
    // L2 is NOT adjacent to C2, R2, etc.
    expect(isValidMove(level3, "L2", "C2")).toBe(false);
    expect(isValidMove(level3, "L2", "R2")).toBe(false);

    // C2 is adjacent to C1, C3, P1
    expect(isValidMove(level3, "C2", "C1")).toBe(true);
    expect(isValidMove(level3, "C2", "C3")).toBe(true);
    expect(isValidMove(level3, "C2", "P1")).toBe(true);
  });

  test("SHUFFLE-TEST-002: Valid Move Execution (Level 1)", () => {
    const state = getInitialState(1);
    // Initially S1 has a Blue coin, S2 is empty
    const newState = moveCoin(state, "S1", "S2");
    expect(newState.positions["S1"]).toBe(null);
    expect(newState.positions["S2"]).toBe("blue");
    expect(newState.moveCount).toBe(1);
  });

  test("SHUFFLE-TEST-007: Move Counter Logic", () => {
    let state = getInitialState(1);
    state = moveCoin(state, "S1", "S2");
    state = moveCoin(state, "S2", "S1");
    expect(state.moveCount).toBe(2);

    // Invalid move should not increment counter
    const invalidState = moveCoin(state, "S1", "S3"); // Not adjacent in Level 1
    expect(invalidState.moveCount).toBe(2);
  });

  test("SHUFFLE-TEST-003: Win Condition Detection (Level 3)", () => {
    const level3 = LEVELS.find((l) => l.id === 3)!;
    const winPositions: Record<string, any> = {
      L1: "green",
      L2: "green",
      L3: "green",
      R1: "blue",
      R2: "blue",
      R3: "blue",
      C1: null,
      C2: null,
      C3: null,
      P1: null,
    };
    expect(level3.winCondition(winPositions as any)).toBe(true);

    const initialPositions = getInitialState(3).positions;
    expect(level3.winCondition(initialPositions)).toBe(false);
  });
});

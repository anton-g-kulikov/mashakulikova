import {
  getInitialState,
  isValidMove,
  moveCoin,
} from "../../src/minigames/coins-shuffler/logic";
import { LEVELS } from "../../src/minigames/coins-shuffler/levels";

describe("Coins Shuffler Logic", () => {
  test("SHUFFLE-TEST-001: Board Adjacency Logic (Level 5)", () => {
    const level5 = LEVELS.find((l) => l.id === 5)!;
    // L2 is adjacent to C1, L1, L3
    expect(isValidMove(level5, "L2", "C1")).toBe(true);
    expect(isValidMove(level5, "L2", "L1")).toBe(true);
    expect(isValidMove(level5, "L2", "L3")).toBe(true);
    // L2 is NOT adjacent to C2, R2, etc.
    expect(isValidMove(level5, "L2", "C2")).toBe(false);
    expect(isValidMove(level5, "L2", "R2")).toBe(false);

    // C2 is adjacent to C1, C3, P1
    expect(isValidMove(level5, "C2", "C1")).toBe(true);
    expect(isValidMove(level5, "C2", "C3")).toBe(true);
    expect(isValidMove(level5, "C2", "P1")).toBe(true);
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

  test("SHUFFLE-TEST-003: Win Condition Detection (Level 5)", () => {
    const level5 = LEVELS.find((l) => l.id === 5)!;
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
    expect(level5.winCondition(winPositions as any)).toBe(true);

    const initialPositions = getInitialState(5).positions;
    expect(level5.winCondition(initialPositions)).toBe(false);
  });

  test("SHUFFLE-TEST-026: Level 3 Configuration and Win Condition", () => {
    const level3 = LEVELS.find((l) => l.id === 3);
    expect(level3).toBeDefined();
    if (!level3) return;

    expect(level3.slots.length).toBe(12);

    const winPositions: Record<string, any> = {
      N: null,
      S: null,
      E: null,
      W: null,
      NW: "green",
      NE: "green",
      PN: "green",
      SW: "blue",
      SE: "blue",
      PS: "blue",
      PE: null,
      PW: null,
    };
    expect(level3.winCondition(winPositions as any)).toBe(true);
  });

  test("SHUFFLE-TEST-027: Level 4 Configuration and Win Condition", () => {
    const level4 = LEVELS.find((l) => l.id === 4);
    expect(level4).toBeDefined();
    if (!level4) return;

    expect(level4.slots.length).toBe(14);

    const winPositions: Record<string, any> = {
      L1: "green",
      L2: "green",
      L5: "green",
      L6: "green",
      R1: "blue",
      R2: "blue",
      R5: "blue",
      R6: "blue",
      L3: null,
      L4: null,
      R3: null,
      R4: null,
      B1: null,
      B2: null,
    };
    // Adjusting win condition based on final design
    expect(level4.winCondition(winPositions as any)).toBe(true);
  });

  test("SHUFFLE-TEST-028: Level 4 top-right coin can move down", () => {
    const level4 = LEVELS.find((l) => l.id === 4)!;

    expect(isValidMove(level4, "R1", "R4")).toBe(true);
    expect(isValidMove(level4, "R1", "R6")).toBe(false);

    const initial = getInitialState(4);
    const afterMove = moveCoin(initial, "R1", "R4");

    expect(afterMove.positions.R1).toBeNull();
    expect(afterMove.positions.R4).toBe("green");
  });

  test("SHUFFLE-TEST-029: Level order swap regression", () => {
    const mazeState = getInitialState(4);
    expect(Object.keys(mazeState.positions)).toHaveLength(14);
    expect(mazeState.positions.R1).toBe("green");
    expect(mazeState.positions.L1).toBe("blue");

    const classicState = getInitialState(5);
    expect(Object.keys(classicState.positions)).toHaveLength(10);
    expect(classicState.positions.R1).toBe("green");
    expect(classicState.positions.L1).toBe("blue");
  });
});

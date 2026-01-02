import { LEVELS, LevelConfig, SlotId } from "./levels";

export type { SlotId };
export type CoinColor = "blue" | "green";

export interface GameState {
  levelId: number;
  positions: Record<SlotId, CoinColor | null>;
  moveCount: number;
  isWin: boolean;
}

export const getInitialState = (levelId: number = 1): GameState => {
  const level = LEVELS.find((l) => l.id === levelId) || LEVELS[0];
  return {
    levelId: level.id,
    positions: { ...level.initialPositions },
    moveCount: 0,
    isWin: false,
  };
};

export const isValidMove = (
  level: LevelConfig,
  from: SlotId,
  to: SlotId
): boolean => {
  return level.adjacency[from]?.includes(to) || false;
};

export const moveCoin = (
  state: GameState,
  from: SlotId,
  to: SlotId
): GameState => {
  const level = LEVELS.find((l) => l.id === state.levelId)!;
  const coin = state.positions[from];
  const target = state.positions[to];

  if (coin && target === null && isValidMove(level, from, to)) {
    const newPositions = { ...state.positions, [from]: null, [to]: coin };
    return {
      ...state,
      positions: newPositions,
      moveCount: state.moveCount + 1,
      isWin: level.winCondition(newPositions),
    };
  }

  return state;
};

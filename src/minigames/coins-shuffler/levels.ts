import { CoinColor } from "./logic";

export type SlotId = string;

export interface LevelConfig {
  id: number;
  name: string;
  slots: SlotId[];
  adjacency: Record<SlotId, SlotId[]>;
  initialPositions: Record<SlotId, CoinColor | null>;
  winCondition: (positions: Record<SlotId, CoinColor | null>) => boolean;
  boardPathDesktop: string;
  boardPathMobile: string;
  slotCoordsDesktop: Record<SlotId, { x: number; y: number }>;
  slotCoordsMobile: Record<SlotId, { x: number; y: number }>;
  viewBoxDesktop: string;
  viewBoxMobile: string;
  widthDesktop: number;
  heightDesktop: number;
  widthMobile: number;
  heightMobile: number;
}

export const LEVELS: LevelConfig[] = [
  {
    id: 1,
    name: "Уровень 1: Разминка",
    slots: ["S1", "S2", "S3"],
    adjacency: {
      S1: ["S2"],
      S2: ["S1", "S3"],
      S3: ["S2"],
    },
    initialPositions: {
      S1: "blue",
      S2: null,
      S3: "green",
    },
    winCondition: (positions) => positions.S1 === "green" && positions.S3 === "blue",
    boardPathDesktop: "M 10,10 H 250 V 90 H 10 Z",
    boardPathMobile: "M 10,10 H 90 V 250 H 10 Z",
    slotCoordsDesktop: {
      S1: { x: 50, y: 50 },
      S2: { x: 130, y: 50 },
      S3: { x: 210, y: 50 },
    },
    slotCoordsMobile: {
      S1: { x: 50, y: 50 },
      S2: { x: 50, y: 130 },
      S3: { x: 50, y: 210 },
    },
    viewBoxDesktop: "0 0 260 100",
    viewBoxMobile: "0 0 100 260",
    widthDesktop: 260,
    heightDesktop: 100,
    widthMobile: 100,
    heightMobile: 260,
  },
  {
    id: 2,
    name: "Уровень 2: Посложнее",
    slots: ["S1", "S2", "S3", "S4", "S5"],
    adjacency: {
      S1: ["S2"],
      S2: ["S1", "S3"],
      S3: ["S2", "S4"],
      S4: ["S3", "S5"],
      S5: ["S4"],
    },
    initialPositions: {
      S1: "blue",
      S2: "blue",
      S3: null,
      S4: "green",
      S5: "green",
    },
    winCondition: (positions) =>
      positions.S1 === "green" &&
      positions.S2 === "green" &&
      positions.S4 === "blue" &&
      positions.S5 === "blue",
    boardPathDesktop: "M 10,10 H 410 V 90 H 10 Z",
    boardPathMobile: "M 10,10 H 90 V 410 H 10 Z",
    slotCoordsDesktop: {
      S1: { x: 50, y: 50 },
      S2: { x: 130, y: 50 },
      S3: { x: 210, y: 50 },
      S4: { x: 290, y: 50 },
      S5: { x: 370, y: 50 },
    },
    slotCoordsMobile: {
      S1: { x: 50, y: 50 },
      S2: { x: 50, y: 130 },
      S3: { x: 50, y: 210 },
      S4: { x: 50, y: 290 },
      S5: { x: 50, y: 370 },
    },
    viewBoxDesktop: "0 0 420 100",
    viewBoxMobile: "0 0 100 420",
    widthDesktop: 420,
    heightDesktop: 100,
    widthMobile: 100,
    heightMobile: 420,
  },
  {
    id: 3,
    name: "Уровень 3: Классика",
    slots: ["L1", "L2", "L3", "R1", "R2", "R3", "C1", "C2", "C3", "P1"],
    adjacency: {
      L1: ["L2"],
      L2: ["L1", "L3", "C1"],
      L3: ["L2"],
      R1: ["R2"],
      R2: ["R1", "R3", "C3"],
      R3: ["R2"],
      C1: ["L2", "C2"],
      C2: ["C1", "C3", "P1"],
      C3: ["C2", "R2"],
      P1: ["C2"],
    },
    initialPositions: {
      L1: "blue",
      L2: "blue",
      L3: "blue",
      R1: "green",
      R2: "green",
      R3: "green",
      C1: null,
      C2: null,
      C3: null,
      P1: null,
    },
    winCondition: (positions) =>
      positions.L1 === "green" &&
      positions.L2 === "green" &&
      positions.L3 === "green" &&
      positions.R1 === "blue" &&
      positions.R2 === "blue" &&
      positions.R3 === "blue",
    boardPathDesktop:
      "M 10,10 H 90 V 90 H 170 V 10 H 250 V 90 H 330 V 10 H 410 V 250 H 330 V 170 H 90 V 250 H 10 Z",
    boardPathMobile:
      "M 10,10 H 250 V 90 H 170 V 330 H 250 V 410 H 10 V 330 H 90 V 250 H 10 V 170 H 90 V 90 H 10 Z",
    slotCoordsDesktop: {
      L1: { x: 50, y: 50 },
      L2: { x: 50, y: 130 },
      L3: { x: 50, y: 210 },
      C1: { x: 130, y: 130 },
      C2: { x: 210, y: 130 },
      C3: { x: 290, y: 130 },
      R1: { x: 370, y: 50 },
      R2: { x: 370, y: 130 },
      R3: { x: 370, y: 210 },
      P1: { x: 210, y: 50 },
    },
    slotCoordsMobile: {
      L1: { x: 50, y: 50 },
      L2: { x: 130, y: 50 },
      L3: { x: 210, y: 50 },
      C1: { x: 130, y: 130 },
      C2: { x: 130, y: 210 },
      C3: { x: 130, y: 290 },
      R1: { x: 50, y: 370 },
      R2: { x: 130, y: 370 },
      R3: { x: 210, y: 370 },
      P1: { x: 50, y: 210 },
    },
    viewBoxDesktop: "0 0 420 260",
    viewBoxMobile: "0 0 260 420",
    widthDesktop: 420,
    heightDesktop: 260,
    widthMobile: 260,
    heightMobile: 420,
  },
];

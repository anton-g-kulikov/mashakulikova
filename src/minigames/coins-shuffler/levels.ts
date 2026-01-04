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
    slots: ["S1", "S2", "S3", "P1"],
    adjacency: {
      S1: ["S2"],
      S2: ["S1", "S3", "P1"],
      S3: ["S2"],
      P1: ["S2"],
    },
    initialPositions: {
      S1: "blue",
      S2: null,
      S3: "green",
      P1: null,
    },
    winCondition: (positions) =>
      positions.S1 === "green" && positions.S3 === "blue",
    boardPathDesktop: "M 10,10 H 250 V 90 H 170 V 170 H 90 V 90 H 10 Z",
    boardPathMobile: "M 10,10 V 250 H 90 V 170 H 170 V 90 H 90 V 10 Z",
    slotCoordsDesktop: {
      S1: { x: 50, y: 50 },
      S2: { x: 130, y: 50 },
      S3: { x: 210, y: 50 },
      P1: { x: 130, y: 130 },
    },
    slotCoordsMobile: {
      S1: { x: 50, y: 50 },
      S2: { x: 50, y: 130 },
      S3: { x: 50, y: 210 },
      P1: { x: 130, y: 130 },
    },
    viewBoxDesktop: "0 0 260 180",
    viewBoxMobile: "0 0 180 260",
    widthDesktop: 260,
    heightDesktop: 180,
    widthMobile: 180,
    heightMobile: 260,
  },
  {
    id: 2,
    name: "Уровень 2: Посложнее",
    slots: ["S1", "S2", "S3", "S4", "S5", "P1", "P2"],
    adjacency: {
      S1: ["S2"],
      S2: ["S1", "S3"],
      S3: ["S2", "S4", "P1", "P2"],
      S4: ["S3", "S5"],
      S5: ["S4"],
      P1: ["S3"],
      P2: ["S3"],
    },
    initialPositions: {
      S1: "blue",
      S2: "blue",
      S3: null,
      S4: "green",
      S5: "green",
      P1: null,
      P2: null,
    },
    winCondition: (positions) =>
      positions.S1 === "green" &&
      positions.S2 === "green" &&
      positions.S4 === "blue" &&
      positions.S5 === "blue",
    boardPathDesktop:
      "M 10,90 H 170 V 10 H 250 V 90 H 410 V 170 H 250 V 250 H 170 V 170 H 10 Z",
    boardPathMobile:
      "M 90,10 V 170 H 10 V 250 H 90 V 410 H 170 V 250 H 250 V 170 H 170 V 10 Z",
    slotCoordsDesktop: {
      S1: { x: 50, y: 130 },
      S2: { x: 130, y: 130 },
      S3: { x: 210, y: 130 },
      S4: { x: 290, y: 130 },
      S5: { x: 370, y: 130 },
      P1: { x: 210, y: 50 },
      P2: { x: 210, y: 210 },
    },
    slotCoordsMobile: {
      S1: { x: 130, y: 50 },
      S2: { x: 130, y: 130 },
      S3: { x: 130, y: 210 },
      S4: { x: 130, y: 290 },
      S5: { x: 130, y: 370 },
      P1: { x: 50, y: 210 },
      P2: { x: 210, y: 210 },
    },
    viewBoxDesktop: "0 0 420 260",
    viewBoxMobile: "0 0 260 420",
    widthDesktop: 420,
    heightDesktop: 260,
    widthMobile: 260,
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
  {
    id: 4,
    name: "Уровень 4: Клевер",
    slots: ["CC", "N", "S", "E", "W", "NW", "NE", "SW", "SE", "PN", "PS", "PE", "PW"],
    adjacency: {
      CC: ["N", "S", "E", "W"],
      N: ["CC", "NW", "NE", "PN"],
      S: ["CC", "SW", "SE", "PS"],
      E: ["CC", "NE", "SE", "PE"],
      W: ["CC", "NW", "SW", "PW"],
      NW: ["N", "W"],
      NE: ["N", "E"],
      SW: ["S", "W"],
      SE: ["S", "E"],
      PN: ["N"],
      PS: ["S"],
      PE: ["E"],
      PW: ["W"],
    },
    initialPositions: {
      CC: null,
      N: null, S: null, E: null, W: null,
      NW: "blue", NE: "blue", PN: "blue",
      SW: "green", SE: "green", PS: "green",
      PE: null, PW: null,
    },
    winCondition: (positions) =>
      positions.NW === "green" &&
      positions.NE === "green" &&
      positions.PN === "green" &&
      positions.SW === "blue" &&
      positions.SE === "blue" &&
      positions.PS === "blue",
    boardPathDesktop: "M 170,10 H 250 V 90 H 330 V 170 H 410 V 250 H 330 V 330 H 250 V 410 H 170 V 330 H 90 V 250 H 10 V 170 H 90 V 90 H 170 Z",
    boardPathMobile: "M 170,10 H 250 V 90 H 330 V 170 H 410 V 250 H 330 V 330 H 250 V 410 H 170 V 330 H 90 V 250 H 10 V 170 H 90 V 90 H 170 Z",
    slotCoordsDesktop: {
      CC: { x: 210, y: 210 },
      N: { x: 210, y: 130 }, S: { x: 210, y: 290 }, E: { x: 290, y: 210 }, W: { x: 130, y: 210 },
      NW: { x: 130, y: 130 }, NE: { x: 290, y: 130 }, SW: { x: 130, y: 290 }, SE: { x: 290, y: 290 },
      PN: { x: 210, y: 50 }, PS: { x: 210, y: 370 }, PE: { x: 370, y: 210 }, PW: { x: 50, y: 210 },
    },
    slotCoordsMobile: {
      CC: { x: 210, y: 210 },
      N: { x: 210, y: 130 }, S: { x: 210, y: 290 }, E: { x: 290, y: 210 }, W: { x: 130, y: 210 },
      NW: { x: 130, y: 130 }, NE: { x: 290, y: 130 }, SW: { x: 130, y: 290 }, SE: { x: 290, y: 290 },
      PN: { x: 210, y: 50 }, PS: { x: 210, y: 370 }, PE: { x: 370, y: 210 }, PW: { x: 50, y: 210 },
    },
    viewBoxDesktop: "0 0 420 420",
    viewBoxMobile: "0 0 420 420",
    widthDesktop: 420,
    heightDesktop: 420,
    widthMobile: 260,
    heightMobile: 260,
  },
  {
    id: 5,
    name: "Уровень 5: Лабиринт",
    slots: ["L1", "L2", "L3", "L4", "L5", "L6", "R1", "R2", "R3", "R4", "R5", "R6", "B1", "B2"],
    adjacency: {
      L1: ["L2", "L6"],
      L2: ["L1", "L3"],
      L3: ["L2", "L4", "L6", "B1"],
      L4: ["L3", "L5"],
      L5: ["L4", "L6"],
      L6: ["L5", "L1", "L3"],
      R1: ["R2", "R6"],
      R2: ["R1", "R3"],
      R3: ["R2", "R4", "R6", "B2"],
      R4: ["R3", "R5"],
      R5: ["R4", "R6"],
      R6: ["R5", "R1", "R3"],
      B1: ["L3", "B2"],
      B2: ["B1", "R3"],
    },
    initialPositions: {
      L1: "blue", L2: "blue", L5: "blue", L6: "blue",
      R1: "green", R2: "green", R5: "green", R6: "green",
      L3: null, L4: null, R3: null, R4: null, B1: null, B2: null,
    },
    winCondition: (positions) =>
      positions.L1 === "green" && positions.L2 === "green" && positions.L5 === "green" && positions.L6 === "green" &&
      positions.R1 === "blue" && positions.R2 === "blue" && positions.R5 === "blue" && positions.R6 === "blue",
    boardPathDesktop: "M 10,10 H 170 V 90 H 330 V 10 H 490 V 250 H 330 V 170 H 170 V 250 H 10 Z",
    boardPathMobile: "M 10,10 V 170 H 90 V 330 H 10 V 490 H 250 V 330 H 170 V 170 H 250 V 10 Z",
    slotCoordsDesktop: {
      L1: { x: 50, y: 50 }, L2: { x: 130, y: 50 },
      L6: { x: 50, y: 130 }, L3: { x: 130, y: 130 },
      L5: { x: 50, y: 210 }, L4: { x: 130, y: 210 },
      B1: { x: 210, y: 130 }, B2: { x: 290, y: 130 },
      R3: { x: 370, y: 130 }, R4: { x: 450, y: 130 },
      R2: { x: 370, y: 50 }, R1: { x: 450, y: 50 },
      R6: { x: 370, y: 210 }, R5: { x: 450, y: 210 },
    },
    slotCoordsMobile: {
      L1: { x: 50, y: 50 }, L2: { x: 50, y: 130 },
      L6: { x: 130, y: 50 }, L3: { x: 130, y: 130 },
      L5: { x: 210, y: 50 }, L4: { x: 210, y: 130 },
      B1: { x: 130, y: 210 }, B2: { x: 130, y: 290 },
      R3: { x: 130, y: 370 }, R4: { x: 210, y: 370 },
      R2: { x: 50, y: 370 }, R1: { x: 50, y: 450 },
      R6: { x: 130, y: 450 }, R5: { x: 210, y: 450 },
    },
    viewBoxDesktop: "0 0 500 260",
    viewBoxMobile: "0 0 260 500",
    widthDesktop: 500,
    heightDesktop: 260,
    widthMobile: 260,
    heightMobile: 500,
  },
];

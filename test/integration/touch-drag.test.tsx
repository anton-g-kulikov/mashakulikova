import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CoinsShuffler } from "../../src/minigames/coins-shuffler/CoinsShuffler";
import "@testing-library/jest-dom";

// Mock framer-motion to capture onDragEnd
jest.mock("framer-motion", () => {
  const actual = jest.requireActual("framer-motion");
  return {
    ...actual,
    motion: {
      ...actual.motion,
      circle: jest
        .fn()
        .mockImplementation(
          ({ onDragEnd, "data-testid": testId, ...props }) => {
            // Filter out framer-motion specific props to avoid React warnings
            const {
              drag,
              dragConstraints,
              dragElastic,
              whileHover,
              whileDrag,
              layout,
              transition,
              ...domProps
            } = props;

            return (
              <circle
                {...domProps}
                data-testid={testId}
                onClick={(e) => {
                  if (onDragEnd) {
                    // Use custom attributes or event detail to pass drag info if needed
                    // For now, we'll just use a default or check if we can pass it via event
                    const offset = (e.target as any)._testOffset || {
                      x: 16,
                      y: 0,
                    };
                    onDragEnd({}, { offset, point: { x: 0, y: 0 } });
                  }
                }}
              />
            );
          }
        ),
    },
  };
});

describe("Touch Drag Sensitivity", () => {
  test("should trigger move when dragged 10 units (very sensitive)", () => {
    render(<CoinsShuffler />);

    // Level 1: S1 is at (50, 50). S2 is at (130, 50).
    // S2 is empty initially.
    // Dragging S1 coin by x=10 puts it at (60, 50).
    // Distance to S2 is 130 - 60 = 70.
    // Our threshold is 72. 70 < 72, so it should move.

    const coin = screen.getByTestId("coin-S1");
    (coin as any)._testOffset = { x: 10, y: 0 };

    // Use fireEvent.click to trigger the mocked onDragEnd
    fireEvent.click(coin);

    // Check if move counter increased
    expect(screen.getByText(/Ходы: 1/)).toBeInTheDocument();

    // Check if S1 is now empty and S2 has the coin
    expect(screen.queryByTestId("coin-S1")).not.toBeInTheDocument();
    expect(screen.getByTestId("coin-S2")).toBeInTheDocument();
  });

  test("should trigger move correctly on mobile (rotated coordinates)", () => {
    // Mock window.innerWidth
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 375,
    });

    render(<CoinsShuffler />);

    // Level 1 Mobile: S1 is at (50, 50). S2 is at (50, 130).
    // To move S1 -> S2, we need to move +Y (Down).
    // So we simulate offset { x: 0, y: 25 }.

    const coin = screen.getByTestId("coin-S1");
    (coin as any)._testOffset = { x: 0, y: 25 };

    fireEvent.click(coin);

    // Check if move counter increased
    expect(screen.getByText(/Ходы: 1/)).toBeInTheDocument();

    // Check if S1 is now empty and S2 has the coin
    expect(screen.queryByTestId("coin-S1")).not.toBeInTheDocument();
    expect(screen.getByTestId("coin-S2")).toBeInTheDocument();
  });
});

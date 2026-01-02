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
      circle: jest.fn().mockImplementation(({ onDragEnd, "data-testid": testId, ...props }) => {
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
            onClick={() => {
              if (onDragEnd) {
                // Simulate a drag of 25 units (which should trigger with our 80 threshold)
                // Distance between slots is 100. 100 - 25 = 75. 75 < 80 is true.
                onDragEnd({}, { offset: { x: 25, y: 0 }, point: { x: 75, y: 150 } });
              }
            }}
          />
        );
      }),
    },
  };
});

describe("Touch Drag Sensitivity", () => {
  test("should trigger move when dragged 25 units (less than 50 midpoint)", () => {
    render(<CoinsShuffler />);
    
    // L2 is at (50, 150). C1 is at (150, 150).
    // C1 is empty initially.
    // Dragging L2 coin by x=25 puts it at (75, 150).
    // Distance to C1 is 150 - 75 = 75.
    // Our threshold is 80. 75 < 80, so it should move.
    
    const coin = screen.getByTestId("coin-L2");
    
    // Use fireEvent.click to trigger the mocked onDragEnd
    fireEvent.click(coin);

    // Check if move counter increased
    expect(screen.getByText(/Moves: 1/)).toBeInTheDocument();
    
    // Check if L2 is now empty and C1 has the coin
    expect(screen.queryByTestId("coin-L2")).not.toBeInTheDocument();
    expect(screen.getByTestId("coin-C1")).toBeInTheDocument();
  });
});

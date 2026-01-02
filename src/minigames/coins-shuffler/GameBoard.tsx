import React from "react";
import { motion } from "framer-motion";
import { SlotId, CoinColor } from "./logic";

interface GameBoardProps {
  positions: Record<SlotId, CoinColor | null>;
  onMove: (from: SlotId, to: SlotId) => void;
  focusedSlot: SlotId | null;
  selectedSlot: SlotId | null;
  isMobile: boolean;
}

export const SLOT_COORDS: Record<SlotId, { x: number; y: number }> = {
  L1: { x: 50, y: 50 },
  L2: { x: 50, y: 150 },
  L3: { x: 50, y: 250 },
  C1: { x: 150, y: 150 },
  C2: { x: 250, y: 150 },
  C3: { x: 350, y: 150 },
  R1: { x: 450, y: 50 },
  R2: { x: 450, y: 150 },
  R3: { x: 450, y: 250 },
  P1: { x: 250, y: 50 },
};

export const GameBoard: React.FC<GameBoardProps> = ({
  positions,
  onMove,
  focusedSlot,
  selectedSlot,
  isMobile,
}) => {
  const handleDragEnd = (from: SlotId, info: any) => {
    // Find the nearest slot
    let nearestSlot: SlotId | null = null;
    let minDistance = Infinity;

    // We need to convert screen coordinates to SVG coordinates or use relative drag distance
    // For simplicity, let's use the drag offset to find the target slot
    const dragX = info.offset.x;
    const dragY = info.offset.y;

    // Note: We do NOT need to manually rotate coordinates for mobile here.
    // The SVG container is rotated via CSS transform, and framer-motion's drag
    // logic operates in the local coordinate space of the element.
    // So dragging "Down" on screen (along the rotated X-axis) correctly reports
    // as an X-offset in the local space, which matches our board logic.

    const currentCoord = SLOT_COORDS[from];
    const targetX = currentCoord.x + dragX;
    const targetY = currentCoord.y + dragY;

    (Object.keys(SLOT_COORDS) as SlotId[]).forEach((id) => {
      if (id === from) return;
      const slot = SLOT_COORDS[id];
      const dist = Math.sqrt(
        Math.pow(slot.x - targetX, 2) + Math.pow(slot.y - targetY, 2)
      );
      if (dist < minDistance) {
        minDistance = dist;
        nearestSlot = id;
      }
    });

    // Trigger movement if we are within 85 units of another slot
    // (Since slots are 100 units apart, this means after ~15 units of drag)
    if (nearestSlot && minDistance < 85) {
      onMove(from, nearestSlot);
    }
  };

  return (
    <div
      style={{
        width: isMobile ? "350px" : "550px",
        height: isMobile ? "550px" : "350px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
      }}
    >
      <svg
        width="550"
        height="350"
        viewBox="0 0 550 350"
        style={{
          transform: isMobile ? "rotate(90deg)" : "none",
          flexShrink: 0,
        }}
      >
        {/* Board Outline */}
        <path
          d="M 10,10 H 90 V 110 H 210 V 10 H 290 V 110 H 410 V 10 H 490 V 290 H 410 V 190 H 90 V 290 H 10 Z"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
        />

        {/* Slots */}
        {(Object.keys(SLOT_COORDS) as SlotId[]).map((id) => (
          <g key={id}>
            <rect
              data-testid={`slot-${id}`}
              x={SLOT_COORDS[id].x - 40}
              y={SLOT_COORDS[id].y - 40}
              width="80"
              height="80"
              fill="transparent"
              stroke={focusedSlot === id ? "#ffeb3b" : "transparent"}
              strokeWidth={focusedSlot === id ? "2" : "0"}
            />
            {selectedSlot === id && (
              <rect
                x={SLOT_COORDS[id].x - 42}
                y={SLOT_COORDS[id].y - 42}
                width="84"
                height="84"
                fill="none"
                stroke="#9c27b0"
                strokeWidth="3"
                strokeDasharray="4 2"
              />
            )}
          </g>
        ))}

        {/* Coins */}
        {(Object.entries(positions) as [SlotId, CoinColor | null][]).map(
          ([id, color]) => {
            if (!color) return null;
            return (
              <motion.circle
                key={id}
                data-testid={`coin-${id}`}
                role="img"
                aria-label={`${color} coin at ${id}`}
                cx={SLOT_COORDS[id].x}
                cy={SLOT_COORDS[id].y}
                r="35"
                fill={color === "blue" ? "#4a90e2" : "#7ed321"}
                stroke="#fff"
                strokeWidth="2"
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.1}
                onDragEnd={(_, info) => handleDragEnd(id, info)}
                whileHover={{ scale: 1.1 }}
                whileDrag={{ scale: 1.2, zIndex: 10 }}
                layout
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            );
          }
        )}
      </svg>
    </div>
  );
};

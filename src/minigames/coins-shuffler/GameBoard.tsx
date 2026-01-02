import React from "react";
import { motion } from "framer-motion";
import { CoinColor } from "./logic";
import { LevelConfig, SlotId } from "./levels";

interface GameBoardProps {
  levelConfig: LevelConfig;
  positions: Record<SlotId, CoinColor | null>;
  onMove: (from: SlotId, to: SlotId) => void;
  focusedSlot: SlotId | null;
  selectedSlot: SlotId | null;
  isMobile: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  levelConfig,
  positions,
  onMove,
  focusedSlot,
  selectedSlot,
  isMobile,
}) => {
  const slotCoords = isMobile
    ? levelConfig.slotCoordsMobile
    : levelConfig.slotCoordsDesktop;
  const boardPath = isMobile
    ? levelConfig.boardPathMobile
    : levelConfig.boardPathDesktop;

  const handleDragEnd = (from: SlotId, info: any) => {
    // Find the nearest slot
    let nearestSlot: SlotId | null = null;
    let minDistance = Infinity;

    const dragX = info.offset.x;
    const dragY = info.offset.y;

    const currentCoord = slotCoords[from];
    const targetX = currentCoord.x + dragX;
    const targetY = currentCoord.y + dragY;

    (Object.keys(slotCoords) as SlotId[]).forEach((id) => {
      if (id === from) return;
      const slot = slotCoords[id];
      const dist = Math.sqrt(
        Math.pow(slot.x - targetX, 2) + Math.pow(slot.y - targetY, 2)
      );
      if (dist < minDistance) {
        minDistance = dist;
        nearestSlot = id;
      }
    });

    // Trigger movement if we are within 72 units of another slot
    if (nearestSlot && minDistance < 72) {
      onMove(from, nearestSlot);
    }
  };

  return (
    <div
      style={{
        width: isMobile ? `${levelConfig.widthMobile}px` : `${levelConfig.widthDesktop}px`,
        height: isMobile ? `${levelConfig.heightMobile}px` : `${levelConfig.heightDesktop}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
      }}
    >
      <svg
        width={isMobile ? levelConfig.widthMobile : levelConfig.widthDesktop}
        height={isMobile ? levelConfig.heightMobile : levelConfig.heightDesktop}
        viewBox={isMobile ? levelConfig.viewBoxMobile : levelConfig.viewBoxDesktop}
        style={{
          flexShrink: 0,
        }}
      >
        {/* Board Outline */}
        <path d={boardPath} fill="#fff" stroke="#db2777" strokeWidth="4" />

        {/* Slots */}
        {(Object.keys(slotCoords) as SlotId[]).map((id) => (
          <g key={id}>
            <rect
              data-testid={`slot-${id}`}
              x={slotCoords[id].x - 40}
              y={slotCoords[id].y - 40}
              width="80"
              height="80"
              fill="transparent"
              stroke={focusedSlot === id ? "#facc15" : "transparent"}
              strokeWidth={focusedSlot === id ? "4" : "0"}
              rx="10"
            />
            {selectedSlot === id && (
              <rect
                x={slotCoords[id].x - 42}
                y={slotCoords[id].y - 42}
                width="84"
                height="84"
                fill="none"
                stroke="#a855f7"
                strokeWidth="4"
                strokeDasharray="8 4"
                rx="12"
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
                aria-label={`${
                  color === "blue" ? "синяя" : "зеленая"
                } монета в ${id}`}
                cx={slotCoords[id].x}
                cy={slotCoords[id].y}
                r="35"
                fill={color === "blue" ? "#06b6d4" : "#84cc16"}
                stroke="#fff"
                strokeWidth="3"
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

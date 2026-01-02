import React, { useState, useEffect, useCallback } from "react";
import { getInitialState, moveCoin, SlotId, isValidMove } from "./logic";
import { GameBoard } from "./GameBoard";
import { Legend } from "./Legend";

export const CoinsShuffler: React.FC = () => {
  const [state, setState] = useState(getInitialState());
  const [focusedSlot, setFocusedSlot] = useState<SlotId | null>("L1");
  const [selectedSlot, setSelectedSlot] = useState<SlotId | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 480);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMove = useCallback(
    (from: SlotId, to: SlotId) => {
      const newState = moveCoin(state, from, to);
      if (newState !== state) {
        setState(newState);
        return true;
      }
      return false;
    },
    [state]
  );

  const handleReset = () => {
    setState(getInitialState());
    setFocusedSlot("L1");
    setSelectedSlot(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (state.isWin) return;

      const current = focusedSlot || "L1";
      let next: SlotId | null = null;

      let key = e.key;
      if (isMobile) {
        // Rotate keyboard mapping for 90deg CW rotation
        // Screen Up -> Board Left
        // Screen Down -> Board Right
        // Screen Left -> Board Down
        // Screen Right -> Board Up
        if (key === "ArrowUp") key = "ArrowLeft";
        else if (key === "ArrowDown") key = "ArrowRight";
        else if (key === "ArrowLeft") key = "ArrowDown";
        else if (key === "ArrowRight") key = "ArrowUp";
      }

      switch (key) {
        case "ArrowUp":
          if (current === "L2") next = "L1";
          else if (current === "L3") next = "L2";
          else if (current === "C2") next = "P1";
          else if (current === "R2") next = "R1";
          else if (current === "R3") next = "R2";
          break;
        case "ArrowDown":
          if (current === "L1") next = "L2";
          else if (current === "L2") next = "L3";
          else if (current === "P1") next = "C2";
          else if (current === "R1") next = "R2";
          else if (current === "R2") next = "R3";
          break;
        case "ArrowLeft":
          if (current === "C1") next = "L2";
          else if (current === "C2") next = "C1";
          else if (current === "C3") next = "C2";
          else if (current === "R2") next = "C3";
          break;
        case "ArrowRight":
          if (current === "L2") next = "C1";
          else if (current === "C1") next = "C2";
          else if (current === "C2") next = "C3";
          else if (current === "C3") next = "R2";
          break;
        case " ":
        case "Enter":
          e.preventDefault();
          if (selectedSlot) {
            setSelectedSlot(null);
          } else if (state.positions[current]) {
            setSelectedSlot(current);
          }
          break;
      }

      if (next) {
        e.preventDefault();
        if (selectedSlot) {
          if (handleMove(selectedSlot, next)) {
            setFocusedSlot(next);
            setSelectedSlot(next);
          }
        } else {
          setFocusedSlot(next);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusedSlot, selectedSlot, state, handleMove]);

  return (
    <div
      className="coins-shuffler"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
        fontFamily: "sans-serif",
      }}
    >
      <h1>Coins Shuffler</h1>

      <div
        style={{
          display: "flex",
          gap: "40px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <GameBoard
          positions={state.positions}
          onMove={handleMove}
          focusedSlot={focusedSlot}
          selectedSlot={selectedSlot}
          isMobile={isMobile}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "300px",
          }}
        >
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            Moves: {state.moveCount}
          </div>
          <Legend />
          <button
            onClick={handleReset}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#333",
              color: "#fff",
              border: "1px solid #fff",
              borderRadius: "4px",
            }}
          >
            Reset Game
          </button>
        </div>
      </div>

      {state.isWin && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
          }}
        >
          <h2 style={{ fontSize: "48px", color: "#4caf50" }}>
            Congratulations!
          </h2>
          <p style={{ fontSize: "24px" }}>
            You finished in {state.moveCount} moves.
          </p>
          <button
            onClick={handleReset}
            style={{
              padding: "15px 30px",
              fontSize: "20px",
              cursor: "pointer",
              backgroundColor: "#4caf50",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
            }}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

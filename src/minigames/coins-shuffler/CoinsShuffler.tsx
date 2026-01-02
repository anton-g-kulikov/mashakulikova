import React, { useState, useEffect, useCallback, useMemo } from "react";
import { getInitialState, moveCoin } from "./logic";
import { GameBoard } from "./GameBoard";
import { Legend } from "./Legend";
import { LEVELS, SlotId } from "./levels";

export const CoinsShuffler: React.FC = () => {
  const [state, setState] = useState(getInitialState(1));
  const [focusedSlot, setFocusedSlot] = useState<SlotId | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<SlotId | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);

  const currentLevelConfig = useMemo(
    () => LEVELS.find((l) => l.id === state.levelId)!,
    [state.levelId]
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 480);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Set initial focus when level changes
  useEffect(() => {
    setFocusedSlot(currentLevelConfig.slots[0]);
    setSelectedSlot(null);
  }, [currentLevelConfig]);

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
    setState(getInitialState(state.levelId));
    setFocusedSlot(currentLevelConfig.slots[0]);
    setSelectedSlot(null);
  };

  const handleNextLevel = () => {
    const nextId = state.levelId + 1;
    if (nextId <= LEVELS.length) {
      setState(getInitialState(nextId));
    }
  };

  const handleLevelSelect = (id: number) => {
    setState(getInitialState(id));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (state.isWin) return;

      const currentId = focusedSlot || currentLevelConfig.slots[0];
      let next: SlotId | null = null;

      let key = e.key;
      if (isMobile) {
        if (key === "ArrowUp") key = "ArrowLeft";
        else if (key === "ArrowDown") key = "ArrowRight";
        else if (key === "ArrowLeft") key = "ArrowDown";
        else if (key === "ArrowRight") key = "ArrowUp";
      }

      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key)) {
        const coords = isMobile
          ? currentLevelConfig.slotCoordsMobile
          : currentLevelConfig.slotCoordsDesktop;
        const current = coords[currentId];
        let minScore = Infinity;

        Object.keys(coords).forEach((id) => {
          if (id === currentId) return;
          const target = coords[id];
          const dx = target.x - current.x;
          const dy = target.y - current.y;

          let match = false;
          if (key === "ArrowUp" && dy < -10 && Math.abs(dx) < 40) match = true;
          if (key === "ArrowDown" && dy > 10 && Math.abs(dx) < 40) match = true;
          if (key === "ArrowLeft" && dx < -10 && Math.abs(dy) < 40) match = true;
          if (key === "ArrowRight" && dx > 10 && Math.abs(dy) < 40) match = true;

          if (match) {
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < minScore) {
              minScore = dist;
              next = id;
            }
          }
        });
      } else if (key === " " || key === "Enter") {
        e.preventDefault();
        if (selectedSlot) {
          setSelectedSlot(null);
        } else if (state.positions[currentId]) {
          setSelectedSlot(currentId);
        }
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
  }, [
    focusedSlot,
    selectedSlot,
    state,
    handleMove,
    isMobile,
    currentLevelConfig,
  ]);

  return (
    <div
      className="coins-shuffler"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#fdf2f8",
        color: "#4c1d95",
        minHeight: "100vh",
        fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'cursive', sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "36px",
          marginBottom: "10px",
          textShadow: "2px 2px #fbcfe8",
        }}
      >
        Пятнашки с монетами
      </h1>
      <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "#db2777" }}>
        {currentLevelConfig.name}
      </h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "30px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {LEVELS.map((l) => (
          <button
            key={l.id}
            onClick={() => handleLevelSelect(l.id)}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: "none",
              backgroundColor: state.levelId === l.id ? "#db2777" : "#fbcfe8",
              color: state.levelId === l.id ? "#fff" : "#4c1d95",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            Уровень {l.id}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: "40px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <GameBoard
          levelConfig={currentLevelConfig}
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
          <div
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              backgroundColor: "#fff",
              padding: "10px 20px",
              borderRadius: "15px",
              border: "3px solid #fbcfe8",
              textAlign: "center",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            Ходы: {state.moveCount}
          </div>
          <Legend />
          <button
            onClick={handleReset}
            style={{
              padding: "15px 30px",
              fontSize: "20px",
              fontWeight: "bold",
              cursor: "pointer",
              backgroundColor: "#ec4899",
              color: "#fff",
              border: "none",
              borderRadius: "30px",
              boxShadow: "0 4px 0 #be185d",
              transition: "transform 0.1s",
            }}
            onMouseDown={(e) =>
              (e.currentTarget.style.transform = "translateY(4px)")
            }
            onMouseUp={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            Начать заново
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
            backgroundColor: "rgba(253, 242, 248, 0.9)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
          }}
        >
          <h2
            style={{ fontSize: "48px", color: "#db2777", marginBottom: "20px" }}
          >
            🎉 Ура! Победа! 🎉
          </h2>
          <p
            style={{ fontSize: "24px", color: "#4c1d95", marginBottom: "30px" }}
          >
            Ты справилась за {state.moveCount} ходов!
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            <button
              onClick={handleReset}
              style={{
                padding: "20px 40px",
                fontSize: "24px",
                fontWeight: "bold",
                cursor: "pointer",
                backgroundColor: "#ec4899",
                color: "#fff",
                border: "none",
                borderRadius: "40px",
                boxShadow: "0 6px 0 #be185d",
              }}
            >
              Еще раз
            </button>
            {state.levelId < LEVELS.length && (
              <button
                onClick={handleNextLevel}
                style={{
                  padding: "20px 40px",
                  fontSize: "24px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  backgroundColor: "#84cc16",
                  color: "#fff",
                  border: "none",
                  borderRadius: "40px",
                  boxShadow: "0 6px 0 #65a30d",
                }}
              >
                Дальше! ➡️
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

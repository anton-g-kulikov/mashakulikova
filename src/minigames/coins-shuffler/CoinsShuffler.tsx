import React, { useState, useEffect, useCallback, useMemo } from "react";
import { getInitialState, moveCoin } from "./logic";
import { GameBoard } from "./GameBoard";
import { Legend } from "./Legend";
import { LEVELS, SlotId } from "./levels";
import { Heading, Button, Card } from "../../components";
import { theme } from "../../theme";

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

  const move = useCallback(
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

  const moveAndDeselect = useCallback(
    (from: SlotId, to: SlotId) => {
      const moved = move(from, to);
      if (moved) {
        setFocusedSlot(to);
        setSelectedSlot(null); // dots disappear after move
      }
      return moved;
    },
    [move]
  );

  const handleSelectSlot = useCallback(
    (slot: SlotId) => {
      if (selectedSlot === slot) {
        setSelectedSlot(null);
        return;
      }
      if (!state.positions[slot]) return; // only select coins
      setSelectedSlot(slot);
      setFocusedSlot(slot);
    },
    [selectedSlot, state.positions]
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
          if (key === "ArrowLeft" && dx < -10 && Math.abs(dy) < 40)
            match = true;
          if (key === "ArrowRight" && dx > 10 && Math.abs(dy) < 40)
            match = true;

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
          moveAndDeselect(selectedSlot, next);
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
    moveAndDeselect,
    isMobile,
    currentLevelConfig,
  ]);

  return (
    <div
      className="coins-shuffler"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Heading>Пятнашки с монетами</Heading>
      <Heading level={2}>{currentLevelConfig.name}</Heading>

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
          <Button
            key={l.id}
            onClick={() => handleLevelSelect(l.id)}
            variant={state.levelId === l.id ? "primary" : "secondary"}
            style={{
              padding: "8px 16px",
              fontSize: "16px",
            }}
          >
            Уровень {l.id}
          </Button>
        ))}
      </div>

      <div
        data-testid="coins-layout-counter-row"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: "24px",
        }}
      >
        <Card
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            textAlign: "center",
            minWidth: "260px",
            maxWidth: "360px",
            width: "100%",
          }}
        >
          Ходы: {state.moveCount}
        </Card>
      </div>

      <div
        data-testid="coins-layout-board-row"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
          padding: "10px 0",
        }}
      >
        <GameBoard
          levelConfig={currentLevelConfig}
          positions={state.positions}
          onMove={moveAndDeselect}
          onSelectSlot={handleSelectSlot}
          focusedSlot={focusedSlot}
          selectedSlot={selectedSlot}
          isMobile={isMobile}
        />
      </div>

      <div
        data-testid="coins-layout-legend-row"
        style={{
          width: "100%",
          maxWidth: "720px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Legend />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleReset}>Начать заново</Button>
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
            backgroundColor: theme.colors.backgroundSemiTransparent,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
          }}
        >
          <Heading level={2} style={{ fontSize: "48px" }}>
            🎉 Ура! Победа! 🎉
          </Heading>
          <p
            style={{
              fontSize: "24px",
              color: theme.colors.text,
              marginBottom: "30px",
            }}
          >
            Ты справилась за {state.moveCount} ходов!
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            <Button onClick={handleReset} size="lg">
              Еще раз
            </Button>
            {state.levelId < LEVELS.length && (
              <Button onClick={handleNextLevel} size="lg" variant="secondary">
                Дальше! ➡️
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

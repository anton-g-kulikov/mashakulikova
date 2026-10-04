import React, { useEffect } from "react";
import { GamePageLayout } from "../components";
import { MemoryGrid } from "../minigames/memory-grid/MemoryGrid";

export const MemoryGridPage: React.FC = () => {
  useEffect(() => {
    document.title = "Запоминалка 🧠";
  }, []);

  return (
    <GamePageLayout>
      <MemoryGrid />
    </GamePageLayout>
  );
};

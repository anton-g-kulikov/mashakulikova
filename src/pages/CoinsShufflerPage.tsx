import React, { useEffect } from "react";
import { GamePageLayout } from "../components";
import { CoinsShuffler } from "../minigames/coins-shuffler/CoinsShuffler";

export const CoinsShufflerPage: React.FC = () => {
  useEffect(() => {
    document.title = "Пятнашки с монетами";
  }, []);

  return (
    <GamePageLayout>
      <CoinsShuffler />
    </GamePageLayout>
  );
};

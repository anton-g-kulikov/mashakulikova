import React, { useEffect } from "react";
import { GamePageLayout } from "../components";
import { MultiplicationTrainer } from "../minigames/multiplication/MultiplicationTrainer";

export const MultiplicationPage: React.FC = () => {
  useEffect(() => {
    document.title = "Умножайка ✖️";
  }, []);

  return (
    <GamePageLayout>
      <MultiplicationTrainer />
    </GamePageLayout>
  );
};

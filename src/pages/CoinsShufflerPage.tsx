import React from "react";
import { Link } from "react-router-dom";
import { CoinsShuffler } from "../minigames/coins-shuffler/CoinsShuffler";

export const CoinsShufflerPage: React.FC = () => {
  return (
    <div>
      <div style={{ padding: "10px", backgroundColor: "#111" }}>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>← Back to Home</Link>
      </div>
      <CoinsShuffler />
    </div>
  );
};

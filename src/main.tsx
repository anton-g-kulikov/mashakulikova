import React from "react";
import ReactDOM from "react-dom/client";
import { CoinsShuffler } from "./minigames/coins-shuffler/CoinsShuffler";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CoinsShuffler />
  </React.StrictMode>
);

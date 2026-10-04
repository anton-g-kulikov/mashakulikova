import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { CoinsShufflerPage } from "./pages/CoinsShufflerPage";
import { MemoryGridPage } from "./pages/MemoryGridPage";
import { MultiplicationPage } from "./pages/MultiplicationPage";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins-shuffler" element={<CoinsShufflerPage />} />
        <Route path="/memory-grid" element={<MemoryGridPage />} />
        <Route path="/multiplication" element={<MultiplicationPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

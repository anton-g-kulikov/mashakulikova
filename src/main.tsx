import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { CoinsShufflerPage } from "./pages/CoinsShufflerPage";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins-shuffler" element={<CoinsShufflerPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

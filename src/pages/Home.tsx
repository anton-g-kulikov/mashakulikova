import React from "react";
import { Link } from "react-router-dom";

export const Home: React.FC = () => {
  return (
    <div style={{ 
      padding: "40px", 
      fontFamily: "sans-serif", 
      backgroundColor: "#000", 
      color: "#fff", 
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <h1>Masha's Projects</h1>
      <nav style={{ marginTop: "20px" }}>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ marginBottom: "15px" }}>
            <Link to="/coins-shuffler" style={{ color: "#4a90e2", fontSize: "20px", textDecoration: "none" }}>
              🎮 Coins Shuffler
            </Link>
          </li>
          <li style={{ marginBottom: "15px" }}>
            <a href="/august2025/presentation.html" style={{ color: "#7ed321", fontSize: "20px", textDecoration: "none" }}>
              📊 August 2025 Presentation
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

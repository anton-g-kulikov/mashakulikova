import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export const Home: React.FC = () => {
  useEffect(() => {
    document.title = "Маша и папа";
  }, []);

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'cursive', sans-serif",
        backgroundColor: "#fdf2f8",
        color: "#4c1d95",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontSize: "48px",
          marginBottom: "40px",
          textShadow: "2px 2px #fbcfe8",
        }}
      >
        Маша и папа 💜
      </h1>
      <nav style={{ marginTop: "20px" }}>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <li>
            <Link
              to="/coins-shuffler"
              style={{
                display: "block",
                padding: "20px 40px",
                backgroundColor: "#ec4899",
                color: "#fff",
                fontSize: "24px",
                textDecoration: "none",
                borderRadius: "20px",
                boxShadow: "0 4px 0 #be185d",
                textAlign: "center",
              }}
            >
              🎮 Головоломка
            </Link>
          </li>
          <li>
            <a
              href="/august2025/presentation.html"
              style={{
                display: "block",
                padding: "20px 40px",
                backgroundColor: "#84cc16",
                color: "#fff",
                fontSize: "24px",
                textDecoration: "none",
                borderRadius: "20px",
                boxShadow: "0 4px 0 #65a30d",
                textAlign: "center",
              }}
            >
              🎞️ Август 2025
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

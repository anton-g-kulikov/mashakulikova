import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { PageContainer, Heading, Button } from "../components";

export const Home: React.FC = () => {
  useEffect(() => {
    document.title = "Маша и папа";
  }, []);

  return (
    <PageContainer>
      <Heading>Маша и папа 💜</Heading>
      <nav style={{ marginTop: "20px", width: "100%", maxWidth: "400px" }}>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "100%",
          }}
        >
          <li style={{ width: "100%" }}>
            <Button
              as={Link}
              to="/coins-shuffler"
              size="lg"
              variant="secondary"
              style={{ display: "block", width: "100%" }}
            >
              🎮 Головоломка
            </Button>
          </li>
          <li style={{ width: "100%" }}>
            <Button
              as={Link}
              to="/memory-grid"
              size="lg"
              variant="secondary"
              style={{ display: "block", width: "100%" }}
            >
              🧠 Запоминалка
            </Button>
          </li>
          <li style={{ width: "100%" }}>
            <Button
              as={Link}
              to="/multiplication"
              size="lg"
              variant="secondary"
              style={{ display: "block", width: "100%" }}
            >
              ✖️ Умножайка
            </Button>
          </li>
          <li style={{ width: "100%" }}>
            <Button
              as="a"
              href="/august2025/presentation.html"
              size="lg"
              style={{ display: "block", width: "100%" }}
            >
              🎞️ Август 2025
            </Button>
          </li>
        </ul>
      </nav>
    </PageContainer>
  );
};

import React from "react";
import { Link } from "react-router-dom";
import { PageContainer } from "./PageContainer";
import { theme } from "../theme";

interface GamePageLayoutProps {
  children: React.ReactNode;
}

export const GamePageLayout: React.FC<GamePageLayoutProps> = ({ children }) => {
  return (
    <PageContainer>
      <div
        style={{
          width: "100%",
          maxWidth: "720px",
          marginBottom: theme.spacing.sm,
          textAlign: "left",
        }}
      >
        <Link
          to="/"
          style={{
            color: theme.colors.primary,
            textDecoration: "none",
            fontSize: "18px",
            fontWeight: "bold",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          🏠 На главную
        </Link>
      </div>
      {children}
    </PageContainer>
  );
};

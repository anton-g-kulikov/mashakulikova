import React from "react";
import { theme } from "../theme";

interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, style, className }) => {
  return (
    <div
      className={className}
      style={{
        backgroundColor: theme.colors.white,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        boxShadow: `0 4px 10px ${theme.colors.shadow}`,
        border: `2px solid ${theme.colors.shadow}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

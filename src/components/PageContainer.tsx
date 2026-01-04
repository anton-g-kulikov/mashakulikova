import React from "react";
import { theme } from "../theme";

interface PageContainerProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  style,
  className,
}) => {
  return (
    <div
      className={className}
      style={{
        padding: `clamp(${theme.spacing.sm}, 5vw, ${theme.spacing.xl})`,
        fontFamily: theme.fonts.main,
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        minHeight: "100vh",
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

import React from "react";
import { theme } from "../theme";

interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3;
  style?: React.CSSProperties;
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  level = 1,
  style,
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const fontSize = {
    1: "clamp(32px, 10vw, 48px)",
    2: "clamp(24px, 8vw, 36px)",
    3: "clamp(20px, 6vw, 24px)",
  }[level];

  const color = level === 1 ? theme.colors.text : theme.colors.heading;
  const textShadow = level === 1 ? `2px 2px ${theme.colors.shadow}` : "none";

  return (
    <Tag
      style={{
        fontSize,
        color,
        textShadow,
        fontFamily: theme.fonts.main,
        marginBottom: theme.spacing.md,
        textAlign: "center",
        width: "100%",
        maxWidth: "100%",
        wordWrap: "break-word",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
};

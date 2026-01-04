import React from "react";
import { theme } from "../theme";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  as?: any;
  to?: string;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  style,
  as: Component = "button",
  ...props
}) => {
  const backgroundColor =
    variant === "primary" ? theme.colors.primary : theme.colors.secondary;
  const shadowColor =
    variant === "primary"
      ? theme.colors.primaryDark
      : theme.colors.secondaryDark;

  const padding =
    size === "lg"
      ? "clamp(15px, 4vw, 20px) clamp(20px, 8vw, 40px)"
      : "15px 30px";
  const fontSize = size === "lg" ? "clamp(20px, 5vw, 24px)" : "20px";
  const borderRadius =
    size === "lg" ? theme.borderRadius.xl : theme.borderRadius.lg;
  const shadowHeight = size === "lg" ? 6 : 4;

  return (
    <Component
      style={{
        padding,
        fontSize,
        fontWeight: "bold",
        cursor: "pointer",
        backgroundColor,
        color: theme.colors.white,
        border: "none",
        borderRadius,
        boxShadow: `0 ${shadowHeight}px 0 ${shadowColor}`,
        transition: "transform 0.1s",
        fontFamily: theme.fonts.main,
        textDecoration: "none",
        display: "inline-block",
        textAlign: "center",
        boxSizing: "border-box",
        maxWidth: "100%",
        ...style,
      }}
      onMouseDown={(e: any) => {
        e.currentTarget.style.transform = `translateY(${shadowHeight}px)`;
        e.currentTarget.style.boxShadow = "none";
      }}
      onMouseUp={(e: any) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = `0 ${shadowHeight}px 0 ${shadowColor}`;
      }}
      onMouseLeave={(e: any) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = `0 ${shadowHeight}px 0 ${shadowColor}`;
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

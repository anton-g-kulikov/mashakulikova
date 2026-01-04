import React from "react";
import { render, screen } from "@testing-library/react";
import { Heading } from "../../../src/components/Heading";
import "@testing-library/jest-dom";

describe("Heading Component", () => {
  it("renders level 1 heading by default", () => {
    render(<Heading>Main Title</Heading>);
    const heading = screen.getByText("Main Title");
    expect(heading.tagName).toBe("H1");
    expect(heading).toHaveStyle({ fontSize: "clamp(32px, 10vw, 48px)" });
  });

  it("renders level 2 heading", () => {
    render(<Heading level={2}>Sub Title</Heading>);
    const heading = screen.getByText("Sub Title");
    expect(heading.tagName).toBe("H2");
    expect(heading).toHaveStyle({ fontSize: "clamp(24px, 8vw, 36px)" });
  });
});

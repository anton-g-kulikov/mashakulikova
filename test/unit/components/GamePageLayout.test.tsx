import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { GamePageLayout } from "../../../src/components/GamePageLayout";
import { theme } from "../../../src/theme";
import "@testing-library/jest-dom";

const renderLayout = () =>
  render(
    <MemoryRouter>
      <GamePageLayout>
        <div>Game content</div>
      </GamePageLayout>
    </MemoryRouter>
  );

describe("GamePageLayout Component", () => {
  it("renders children inside a themed page container", () => {
    const { container } = renderLayout();
    expect(screen.getByText("Game content")).toBeInTheDocument();
    expect(container.firstChild).toHaveStyle({
      backgroundColor: "rgb(253, 242, 248)",
    });
  });

  it("renders a home link styled with the primary color", () => {
    renderLayout();
    const link = screen.getByRole("link", { name: /На главную/ });
    expect(link).toHaveAttribute("href", "/");
    expect(link).toHaveStyle({ color: theme.colors.primary });
  });

  it("places the home link before the game content", () => {
    renderLayout();
    const link = screen.getByRole("link", { name: /На главную/ });
    const content = screen.getByText("Game content");
    expect(
      link.compareDocumentPosition(content) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Home } from "../../src/pages/Home";
import { theme } from "../../src/theme";
import "@testing-library/jest-dom";

describe("Home Page", () => {
  it("renders buttons with correct variants", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const puzzleButton = screen.getByText(/Головоломка/i);
    const memoryButton = screen.getByText(/Запоминалка/i);
    const multiplicationButton = screen.getByText(/Умножайка/i);
    const presentationButton = screen.getByText(/Август 2025/i);

    // Mini-games should be green (secondary)
    expect(puzzleButton).toHaveStyle({
      backgroundColor: theme.colors.secondary,
    });
    expect(memoryButton).toHaveStyle({
      backgroundColor: theme.colors.secondary,
    });
    expect(multiplicationButton).toHaveStyle({
      backgroundColor: theme.colors.secondary,
    });
    expect(multiplicationButton).toHaveAttribute("href", "/multiplication");

    // Presentation should be pink (primary)
    expect(presentationButton).toHaveStyle({
      backgroundColor: theme.colors.primary,
    });
  });
});

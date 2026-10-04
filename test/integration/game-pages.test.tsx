import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CoinsShufflerPage } from "../../src/pages/CoinsShufflerPage";
import { MemoryGridPage } from "../../src/pages/MemoryGridPage";
import "@testing-library/jest-dom";

const pages = [
  { name: "CoinsShufflerPage", Page: CoinsShufflerPage, title: "Пятнашки с монетами" },
  { name: "MemoryGridPage", Page: MemoryGridPage, title: "Запоминалка 🧠" },
];

describe.each(pages)("$name", ({ Page, title }) => {
  const renderPage = () =>
    render(
      <MemoryRouter>
        <Page />
      </MemoryRouter>
    );

  it("shows exactly one home link to /", () => {
    renderPage();
    const links = screen.getAllByRole("link", { name: /На главную/ });
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute("href", "/");
  });

  it("renders exactly one themed page container", () => {
    const { container } = renderPage();
    const themed = Array.from(container.querySelectorAll("div")).filter(
      (el) => el.style.backgroundColor === "rgb(253, 242, 248)"
    );
    expect(themed).toHaveLength(1);
    expect(container.firstChild).toBe(themed[0]);
  });

  it("sets the localized document title", () => {
    renderPage();
    expect(document.title).toBe(title);
  });
});

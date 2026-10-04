import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MultiplicationTrainer } from "../../src/minigames/multiplication/MultiplicationTrainer";
import { createRng } from "../../src/minigames/multiplication/random";
import { STORAGE_KEY } from "../../src/minigames/multiplication/progress";

const CORRECT_DELAY_MS = 1000;

// Reads "a × b = ?" from the screen and returns the right answer.
const correctAnswer = () => {
  const m = screen.getByTestId("prompt").textContent!.match(/(\d) × (\d) = \?/);
  return String(Number(m![1]) * Number(m![2]));
};

const wrongAnswer = () => {
  const right = correctAnswer();
  return screen
    .getAllByTestId("answer-option")
    .map((b) => b.textContent!)
    .find((t) => t !== right)!;
};

const choose = (text: string) =>
  fireEvent.click(
    screen.getAllByTestId("answer-option").find((b) => b.textContent === text)!
  );

const savedProgress = () => JSON.parse(localStorage.getItem(STORAGE_KEY)!);

const startMissingResult = () =>
  fireEvent.click(screen.getByRole("button", { name: /Сколько будет/ }));

describe("MULT-TEST-011: trainer flow", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("menu shows the table and four games", () => {
    render(<MultiplicationTrainer rng={createRng(1)} />);
    expect(screen.getAllByTestId(/^cell-\d-\d$/)).toHaveLength(81);
    [/Найди множитель/, /Сколько будет/, /Верно или нет/, /Что больше/].forEach(
      (name) => expect(screen.getByRole("button", { name })).toBeInTheDocument()
    );
  });

  it("correct answer: praise, save, auto-advance", () => {
    render(<MultiplicationTrainer rng={createRng(1)} />);
    startMissingResult();
    expect(screen.getByText("1 / 20")).toBeInTheDocument();

    choose(correctAnswer());
    expect(screen.getByTestId("feedback-correct")).toBeInTheDocument();
    expect(savedProgress().questionCounter).toBe(1);

    act(() => {
      jest.advanceTimersByTime(CORRECT_DELAY_MS);
    });
    expect(screen.getByText("2 / 20")).toBeInTheDocument();
  });

  it("wrong answer: reveal the fact and wait for «Дальше»", () => {
    render(<MultiplicationTrainer rng={createRng(1)} />);
    startMissingResult();
    const right = correctAnswer();

    choose(wrongAnswer());
    expect(screen.getByTestId("reveal")).toHaveTextContent(`= ${right}`);
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(screen.getByText("1 / 20")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Дальше/ }));
    expect(screen.getByText("2 / 20")).toBeInTheDocument();
    const facts = Object.values(savedProgress().facts) as any[];
    expect(facts.some((f) => f.incorrectCount === 1)).toBe(true);
  });

  it("finishes after 20 questions with a summary, and progress survives remount", () => {
    const { unmount } = render(<MultiplicationTrainer rng={createRng(2)} />);
    startMissingResult();
    for (let i = 0; i < 20; i++) {
      choose(correctAnswer());
      act(() => {
        jest.advanceTimersByTime(CORRECT_DELAY_MS);
      });
    }

    expect(screen.getByTestId("summary-score")).toHaveTextContent("20 из 20");
    expect(screen.getByTestId("improved-facts")).toBeInTheDocument();
    expect(screen.getAllByTestId(/^cell-\d-\d$/)).toHaveLength(81);

    fireEvent.click(screen.getByRole("button", { name: /Ещё раз/ }));
    expect(screen.getByText("1 / 20")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /К таблице/ }));
    expect(screen.getByRole("button", { name: /Что больше/ })).toBeInTheDocument();

    unmount();
    render(<MultiplicationTrainer rng={createRng(3)} />);
    const practised = screen
      .getAllByTestId(/^cell-\d-\d$/)
      .filter((c) => c.getAttribute("data-level") !== "0");
    expect(practised.length).toBeGreaterThan(0);
  });
});

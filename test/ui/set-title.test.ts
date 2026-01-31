import type { DataContext } from "../../ts/types.js";

import { expect, it } from "vitest";

import { setTitle } from "../../ts/ui/set-title.js";

const mockedTitles: { dataContext: DataContext; expected: string }[] = [
  {
    dataContext: {
      context: "start"
    },
    expected: "Frontend Quiz"
  },
  {
    dataContext: {
      context: "question",
      title: "Fake subject",
      subject: "fake-subject",
      themeColour: "#abcdef",
      question: 1,
      questions: 10
    },
    expected: "Question 1 of 10 — Fake subject — Frontend Quiz"
  },
  {
    dataContext: {
      context: "question",
      title: "Fake subject",
      subject: "fake-subject",
      themeColour: "#abcdef",
      question: 2,
      questions: 10
    },
    expected: "Question 2 of 10 — Fake subject — Frontend Quiz"
  },
  {
    dataContext: {
      context: "question",
      title: "Fake subject",
      subject: "fake-subject",
      themeColour: "#abcdef",
      question: 3,
      questions: 10
    },
    expected: "Question 3 of 10 — Fake subject — Frontend Quiz"
  },
  {
    dataContext: {
      context: "question",
      title: "Fake subject",
      subject: "fake-subject",
      themeColour: "#abcdef",
      question: 4,
      questions: 10
    },
    expected: "Question 4 of 10 — Fake subject — Frontend Quiz"
  },
  {
    dataContext: {
      context: "question",
      title: "Fake subject",
      subject: "fake-subject",
      themeColour: "#abcdef",
      question: 5,
      questions: 10
    },
    expected: "Question 5 of 10 — Fake subject — Frontend Quiz"
  },
  {
    dataContext: {
      context: "question",
      title: "Fake subject",
      subject: "fake-subject",
      themeColour: "#abcdef",
      question: 6,
      questions: 10
    },
    expected: "Question 6 of 10 — Fake subject — Frontend Quiz"
  },
  {
    dataContext: {
      context: "question",
      title: "Fake subject",
      subject: "fake-subject",
      themeColour: "#abcdef",
      question: 7,
      questions: 10
    },
    expected: "Question 7 of 10 — Fake subject — Frontend Quiz"
  },
  {
    dataContext: {
      context: "question",
      title: "Fake subject",
      subject: "fake-subject",
      themeColour: "#abcdef",
      question: 8,
      questions: 10
    },
    expected: "Question 8 of 10 — Fake subject — Frontend Quiz"
  },
  {
    dataContext: {
      context: "question",
      title: "Fake subject",
      subject: "fake-subject",
      themeColour: "#abcdef",
      question: 9,
      questions: 10
    },
    expected: "Question 9 of 10 — Fake subject — Frontend Quiz"
  },
  {
    dataContext: {
      context: "question",
      title: "Fake subject",
      subject: "fake-subject",
      themeColour: "#abcdef",
      question: 10,
      questions: 10
    },
    expected: "Question 10 of 10 — Fake subject — Frontend Quiz"
  },
  {
    dataContext: {
      context: "score",
      title: "Fake subject",
      subject: "fake-subject",
      themeColour: "#abcdef"
    },
    expected: "Quiz completed — Fake subject — Frontend Quiz"
  }
];

it.each(mockedTitles)("should set the title to $expected", ({ dataContext, expected }) => {
  setTitle(dataContext);
  expect(document.title).toBe(expected);
});

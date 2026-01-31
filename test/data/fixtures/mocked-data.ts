import type { QuizData } from "../../../ts/types.js";

export const mockedData: QuizData["quizzes"] = [
  {
    id: "sample-quiz",
    title: "Sample Quiz",
    icon: "./images/icon-sample-quiz.svg",
    themeColour: "#123456",
    questions: [
      {
        id: 1,
        title: "What is this question?",
        options: ["Foo", "Bar", "Baz", "Qux"],
        answer: "Foo"
      },
      {
        id: 2,
        title: "What is this other question?",
        options: ["Foobar", "Barfoo", "Bazbar", "Quxbar"],
        answer: "Foobar"
      }
    ]
  },
  {
    id: "fake-quiz",
    title: "Fake Quiz",
    icon: "./images/icon-fake-quiz.svg",
    themeColour: "#abcdef",
    questions: [
      {
        id: 1,
        title: "What the hell is this question?",
        options: ["Answer A", "Answer B", "Answer C", "Answer D"],
        answer: "Answer A"
      }
    ]
  }
];

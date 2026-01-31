import type { DataContext } from "../../ts/types.js";

import { expect, it } from "vitest";

import { setSubjectThemeColourStyle } from "../../ts/ui/set-subject-theme-colour-style.js";

const mockedContexts: { dataContext: DataContext; expected: string | undefined }[] = [
  {
    dataContext: { context: "start" },
    expected: ""
  },
  {
    dataContext: {
      context: "question",
      title: "Fake Subject",
      subject: "fake-subject",
      themeColour: "#abcdef",
      question: 1,
      questions: 1
    },
    expected: "#abcdef"
  },
  {
    dataContext: {
      context: "score",
      title: "Fake Subject",
      subject: "fake-subject",
      themeColour: "#abcdef"
    },
    expected: "#abcdef"
  }
];

it.each(mockedContexts)("should return $expected when the context is $dataContext.context", ({ dataContext, expected }) => {
  setSubjectThemeColourStyle(dataContext);
  expect(document.body.style.getPropertyValue("--subject-theme-colour")).toBe(expected);
});

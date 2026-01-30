import { expect, it } from "vitest";

import { stringToKebabCase } from "../../ts/utils/string-to-kebab-case.js";

const mockedStrings = [
  {
    input: "Hello World",
    expected: "hello-world"
  },
  {
    input: "Fake Subject",
    expected: "fake-subject"
  },
  {
    input: "HTML",
    expected: "html"
  },
  {
    input: "CSS",
    expected: "css"
  },
  {
    input: "JavaScript",
    expected: "javascript"
  },
  {
    input: "Accessibility",
    expected: "accessibility"
  }
];

it.each(mockedStrings)("should convert $input to $expected", ({ input, expected }) => {
  const result = stringToKebabCase(input);
  expect(result).toBe(expected);
});

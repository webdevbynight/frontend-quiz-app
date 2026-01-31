import { expect, it } from "vitest";

import { indexToLetter } from "../../ts/utils/index-to-letter.js";

const mockedIndexes = [
  {
    index: 0,
    expected: "A"
  },
  {
    index: 1,
    expected: "B"
  },
  {
    index: 2,
    expected: "C"
  },
  {
    index: 3,
    expected: "D"
  }
];

it.each(mockedIndexes)("should return $expected when the index is $index", ({ index, expected }) => {
  expect(indexToLetter(index)).toBe(expected);
});

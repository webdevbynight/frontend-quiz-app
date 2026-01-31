import { expect, it, vi } from "vitest";

import { getScore } from "../../ts/utils/get-score.js";

const mockedStorage = '{"modeChoice":"dark","quiz":{"id":"sample-quiz","title":"Sample Quiz","themeColour":"#abcdef","isCompleted":true,"questions":[{"id":1,"isAnswered":true,"isAnswerCorrect":true},{"id":2,"isAnswered":true,"isAnswerCorrect":false}]}}';
const mockedScores = [
  {
    storage: '{"modeChoice":"dark","quiz":{"id":"sample-quiz","title":"Sample Quiz","themeColour":"#abcdef","isCompleted":true,"questions":[{"id":1,"isAnswered":true,"isAnswerCorrect":false},{"id":2,"isAnswered":true,"isAnswerCorrect":false}]}}',
    expectedScore: 0,
    expectedTotal: 2
  },
  {
    storage: mockedStorage,
    expectedScore: 1,
    expectedTotal: 2
  },
  {
    storage: '{"modeChoice":"dark","quiz":{"id":"sample-quiz","title":"Sample Quiz","themeColour":"#abcdef","isCompleted":true,"questions":[{"id":1,"isAnswered":true,"isAnswerCorrect":true},{"id":2,"isAnswered":true,"isAnswerCorrect":true}]}}',
    expectedScore: 2,
    expectedTotal: 2
  }
];

it("should return 0 out of 0 if the storage is not found", () => {
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
  expect(getScore("fake-subject")).toEqual([0, 0]);
});
it("should return 0 out of 0 if no subject is found in the storage", () => {
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue('{"modeChoice":"dark"}');
  expect(getScore("fake-subject")).toEqual([0, 0]);
});
it("should return 0 out of 0 if the subject is found in the storage", () => {
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(mockedStorage);
  expect(getScore("fake-subject")).toEqual([0, 0]);
});
it.each(mockedScores)("should return $expectedScore out of $expectedTotal", ({ storage, expectedScore, expectedTotal }) => {
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(storage);
  expect(getScore("sample-quiz")).toEqual([expectedScore, expectedTotal]);
});

import { expect, it, vi } from "vitest";

import { updateSelectedSubject } from "../../ts/utils/update-selected-subject.js";

import { STORAGE_ITEM_NAME } from "../../ts/utils/constants.js";

const mockedStorage = '{"modeChoice":"dark","quiz":{"id":"sample-quiz","title":"Sample Quiz","themeColour":"#abcdef","isCompleted":false,"questions":[{"id":1,"isAnswered":false,"isAnswerCorrect":false},{"id":2,"isAnswered":false,"isAnswerCorrect":false}]}}';
const mockedUpdatedStorages = [
  {
    storage: mockedStorage,
    questionId: 1,
    isAnswerCorrect: true,
    expected: '{"modeChoice":"dark","quiz":{"id":"sample-quiz","title":"Sample Quiz","themeColour":"#abcdef","isCompleted":false,"questions":[{"id":1,"isAnswered":true,"isAnswerCorrect":true},{"id":2,"isAnswered":false,"isAnswerCorrect":false}]}}'
  },
  {
    storage: '{"modeChoice":"dark","quiz":{"id":"sample-quiz","title":"Sample Quiz","themeColour":"#abcdef","isCompleted":false,"questions":[{"id":1,"isAnswered":true,"isAnswerCorrect":true},{"id":2,"isAnswered":true,"isAnswerCorrect":false}]}}',
    questionId: 2,
    isAnswerCorrect: false,
    expected: '{"modeChoice":"dark","quiz":{"id":"sample-quiz","title":"Sample Quiz","themeColour":"#abcdef","isCompleted":true,"questions":[{"id":1,"isAnswered":true,"isAnswerCorrect":true},{"id":2,"isAnswered":true,"isAnswerCorrect":false}]}}'
  }
];
const spyStorage = vi.spyOn(Storage.prototype, "setItem");

it("should not store the updated subject if the storage is not found", () => {
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
  updateSelectedSubject("fake-subject", 1, true);
  expect(spyStorage).not.toHaveBeenCalled();
});
it("should not store the updated subject if no subject is found in the storage", () => {
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue('{"modeChoice":"dark"}');
  updateSelectedSubject("fake-subject", 1, true);
  expect(spyStorage).not.toHaveBeenCalled();
});
it("should not store the updated subject if the subject is not found in the storage", () => {
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(mockedStorage);
  updateSelectedSubject("fake-subject", 1, true);
  expect(spyStorage).not.toHaveBeenCalled();
});
it("should not store the updated subject if the question is not found in the storage", () => {
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(mockedStorage);
  updateSelectedSubject("sample-quiz", 3, true);
  expect(spyStorage).not.toHaveBeenCalled();
});
it.each(mockedUpdatedStorages)("should store the selected subject if the question $questionId is found in the storage", ({ storage, questionId, isAnswerCorrect, expected }) => {
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(storage);
  updateSelectedSubject("sample-quiz", questionId, isAnswerCorrect);
  expect(spyStorage).toHaveBeenCalledWith(STORAGE_ITEM_NAME, expected);
});

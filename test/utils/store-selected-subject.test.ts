import type { QuizStorageData } from "../../ts/types.js";

import { expect, it, vi } from "vitest";

import { storeSelectedSubject } from "../../ts/utils/store-selected-subject.js";

import { STORAGE_ITEM_NAME } from "../../ts/utils/constants.js";

const mockedSubjectData: QuizStorageData = {
  id: "sample-quiz",
  title: "Sample Quiz",
  themeColour: "#abcdef",
  isCompleted: false,
  questions: [{ id: 1, isAnswered: false, isAnswerCorrect: false }]
};
const spyStorage = vi.spyOn(Storage.prototype, "setItem");

it("should not store the selected subject if the storage is not found", () => {
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
  storeSelectedSubject(mockedSubjectData);
  expect(spyStorage).not.toHaveBeenCalled();
});
it("should store the selected subject if the storage is found", () => {
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue('{"modeChoice":"dark"}');
  storeSelectedSubject(mockedSubjectData);
  expect(spyStorage).toHaveBeenCalledWith(STORAGE_ITEM_NAME, '{"modeChoice":"dark","quiz":{"id":"sample-quiz","title":"Sample Quiz","themeColour":"#abcdef","isCompleted":false,"questions":[{"id":1,"isAnswered":false,"isAnswerCorrect":false}]}}');
});
it("should store the selected subject if the storage is found and has an existing subject", () => {
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue('{"modeChoice":"dark","quiz":{"title":"Fake Quiz","subject":"fake-quiz","themeColour":"#000000","isCompleted":false,"questions":[{"id":1,"isAnswered":false,"isAnswerCorrect":false}]}}');
  storeSelectedSubject(mockedSubjectData);
  expect(spyStorage).toHaveBeenCalledWith(STORAGE_ITEM_NAME, '{"modeChoice":"dark","quiz":{"id":"sample-quiz","title":"Sample Quiz","themeColour":"#abcdef","isCompleted":false,"questions":[{"id":1,"isAnswered":false,"isAnswerCorrect":false}]}}');
});

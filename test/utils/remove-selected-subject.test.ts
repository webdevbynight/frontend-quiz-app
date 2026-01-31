import { expect, it, vi } from "vitest";

import { removeSelectedSubject } from "../../ts/utils/remove-selected-subject.js";

import { STORAGE_ITEM_NAME } from "../../ts/utils/constants.js";

const spyStorage = vi.spyOn(Storage.prototype, "setItem");

it("should not store the updated subject if the storage is not found", () => {
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
  removeSelectedSubject();
  expect(spyStorage).not.toHaveBeenCalled();
});
it("should not store the updated subject if no subject is found in the storage", () => {
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue('{"modeChoice":"dark"}');
  removeSelectedSubject();
  expect(spyStorage).not.toHaveBeenCalled();
});
it("should remove the selected subject", () => {
  const mockedStorage = '{"modeChoice":"dark","quiz":{"id":"sample-quiz","title":"Sample Quiz","themeColour":"#abcdef","isCompleted":true,"questions":[{"id":1,"isAnswered":false,"isAnswerCorrect":false},{"id":2,"isAnswered":true,"isAnswerCorrect":false}]}}';
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(mockedStorage);
  removeSelectedSubject();
  expect(spyStorage).toHaveBeenCalledWith(STORAGE_ITEM_NAME, '{"modeChoice":"dark"}');
});

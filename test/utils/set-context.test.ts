import { expect, it, vi } from "vitest";

import { setContext } from "../../ts/utils/set-context.js";

const mockedContexts = [
  {
    storage: null,
    expected: "start"
  },
  {
    storage: '{"modeChoice":"dark"}',
    expected: "start"
  },
  {
    storage: '{"modeChoice":"dark","quiz":{"subject":"fake-subject","isCompleted":false,"questions":[{"id":1,"isAnswered":false}]}}',
    expected: "question"
  },
  {
    storage: '{"modeChoice":"dark","quiz":{"subject":"fake-subject","isCompleted":true,"questions":[{"id":1,"isAnswered":true}]}}',
    expected: "score"
  }
];

it.each(mockedContexts)("should return $expected when storage is $storage", ({ storage, expected }) => {
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(storage);
  setContext();
  expect(document.body.dataset.context).toBe(expected);
});

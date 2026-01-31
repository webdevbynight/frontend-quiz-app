import type { DataContext } from "../../ts/types.js";

import { assert, it, vi } from "vitest";

import { getDataContext } from "../../ts/utils/get-data-context.js";

const mockedContexts: { storage: string | null; expected: DataContext }[] = [
  {
    storage: null,
    expected: { context: "start" }
  },
  {
    storage: '{"modeChoice":"dark"}',
    expected: { context: "start" }
  },
  {
    storage: '{"modeChoice":"dark","quiz":{"id":"fake-subject","title":"Fake subject","themeColour":"#abcdef","isCompleted":false,"questions":[{"id":1,"isAnswered":false}]}}',
    expected: { context: "question", subject: "fake-subject", title: "Fake subject", themeColour: "#abcdef", question: 1, questions: 1 }
  },
  {
    storage: '{"modeChoice":"dark","quiz":{"id":"fake-subject","title":"Fake subject","themeColour":"#abcdef","isCompleted":true,"questions":[{"id":1,"isAnswered":true}]}}',
    expected: { context: "score", subject: "fake-subject", title: "Fake subject", themeColour: "#abcdef" }
  }
];

it.each(mockedContexts)("should return $expected when storage is $storage", ({ storage, expected }) => {
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(storage);
  assert.deepEqual(getDataContext(), expected);
});

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
    storage: '{"modeChoice":"dark","quiz":{"title":"Fake subject","subject":"fake-subject","isCompleted":false,"questions":[{"id":1,"isAnswered":false}]}}',
    expected: { context: "question", title: "Fake subject", subject: "fake-subject", question: 1, questions: 1 }
  },
  {
    storage: '{"modeChoice":"dark","quiz":{"title":"Fake subject","subject":"fake-subject","isCompleted":true,"questions":[{"id":1,"isAnswered":true}]}}',
    expected: { context: "score", title: "Fake subject", subject: "fake-subject" }
  }
];

it.each(mockedContexts)("should return $expected when storage is $storage", ({ storage, expected }) => {
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(storage);
  assert.deepEqual(getDataContext(), expected);
});

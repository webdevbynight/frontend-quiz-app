import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { getModeChoice } from "../../ts/mode-choice/get-mode-choice.js";
import { getStorage } from "../../ts/utils/get-storage.js";

const mockedStorages = [
  { storage: '{"modeChoice":"light"}', expected: "light" },
  { storage: '{"modeChoice":"dark"}', expected: "dark" }
];

beforeEach(() => {
  vi.mock("../../ts/utils/get-storage.js", () => ({
    getStorage: vi.fn()
  }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should return 'light' if no storage is found", () => {
  vi.mocked(getStorage).mockReturnValue(null);
  expect(getModeChoice()).toBe("light");
});
it.each(mockedStorages)("should return the mode choice from the storage", ({ storage, expected }) => {
  vi.mocked(getStorage).mockReturnValue(storage);
  expect(getModeChoice()).toBe(expected);
});

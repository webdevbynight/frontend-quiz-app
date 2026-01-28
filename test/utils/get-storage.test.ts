import { expect, it, vi } from "vitest";

import { getStorage } from "../../ts/utils/get-storage.js";

it("should return `null` if no storage is found", () => {
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
  expect(getStorage()).toBe(null);
});
it("should return the storage if it exists", () => {
  const mockedStorage = '{"modeChoice":"dark"}';
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(mockedStorage);
  expect(getStorage()).toBe(mockedStorage);
});

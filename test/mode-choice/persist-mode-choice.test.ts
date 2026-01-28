import { expect, it, vi } from "vitest";

import { persistModeChoice } from "../../ts/mode-choice/persist-mode-choice.js";

import { STORAGE_ITEM_NAME } from "../../ts/utils/constants.js";

it("should persist light mode choice", () => {
  const spyStorage = vi.spyOn(Storage.prototype, "setItem");
  persistModeChoice("light");
  expect(spyStorage).toHaveBeenCalledWith(STORAGE_ITEM_NAME, '{"modeChoice":"light"}');
});
it("should persist dark mode choice", () => {
  const spyStorage = vi.spyOn(Storage.prototype, "setItem");
  persistModeChoice("dark");
  expect(spyStorage).toHaveBeenCalledWith(STORAGE_ITEM_NAME, '{"modeChoice":"dark"}');
});

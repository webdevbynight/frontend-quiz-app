import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { handleModeChoice } from "../../ts/mode-choice/handle-mode-choice.js";
import { persistModeChoice } from "../../ts/mode-choice/persist-mode-choice.js";
import { updateModeChoice } from "../../ts/mode-choice/update-mode-choice.js";

const mockedCheckbox = document.createElement("input");
mockedCheckbox.type = "checkbox";

beforeEach(() => {
  vi.mock("../../ts/mode-choice/persist-mode-choice.js", () => ({ persistModeChoice: vi.fn() }));
  vi.mock("../../ts/mode-choice/update-mode-choice.js", () => ({ updateModeChoice: vi.fn() }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should update mode choice to light", () => {
  mockedCheckbox.checked = false;
  handleModeChoice(mockedCheckbox);
  mockedCheckbox.dispatchEvent(new Event("change"));
  expect(updateModeChoice).toHaveBeenCalledWith("light");
  expect(persistModeChoice).toHaveBeenCalledWith("light");
});
it("should update mode choice to dark", () => {
  mockedCheckbox.checked = true;
  handleModeChoice(mockedCheckbox);
  mockedCheckbox.dispatchEvent(new Event("change"));
  expect(updateModeChoice).toHaveBeenCalledWith("dark");
  expect(persistModeChoice).toHaveBeenCalledWith("dark");
});

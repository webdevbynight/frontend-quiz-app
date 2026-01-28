import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { getModeChoice } from "../../ts/mode-choice/get-mode-choice.js";
import { initModeChoice } from "../../ts/mode-choice/init-mode-choice.js";
import { updateModeChoice } from "../../ts/mode-choice/update-mode-choice.js";

const mockedMatchMedia = {
  matches: false,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn()
};
const mockedCheckbox = document.createElement("input");
mockedCheckbox.type = "checkbox";

beforeEach(() => {
  vi.mock("../../ts/mode-choice/get-mode-choice.js", () => ({
    getModeChoice: vi.fn()
  }));
  vi.mock("../../ts/mode-choice/update-mode-choice.js", () => ({
    updateModeChoice: vi.fn()
  }));
  window.matchMedia = vi.fn().mockImplementation(query => ({
    ...mockedMatchMedia,
    matches: false,
    media: query
  }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should init with dark mode if `prefers-color-scheme` is dark", () => {
  window.matchMedia = vi.fn().mockImplementation(query => ({
    ...mockedMatchMedia,
    matches: query === "(prefers-color-scheme: dark)",
    media: query
  }));
  initModeChoice(mockedCheckbox);
  expect(updateModeChoice).toHaveBeenCalledWith("dark");
  expect(mockedCheckbox.checked).toBe(true);
});
it("should init with dark mode if the mode choice stored is dark", () => {
  vi.mocked(getModeChoice).mockReturnValue("dark");
  initModeChoice(mockedCheckbox);
  expect(updateModeChoice).toHaveBeenCalledWith("dark");
  expect(mockedCheckbox.checked).toBe(true);
});
it("should init with light mode if the mode choice stored is light or no storage is found", () => {
  vi.mocked(getModeChoice).mockReturnValue("light");
  initModeChoice(mockedCheckbox);
  expect(updateModeChoice).toHaveBeenCalledWith("light");
  expect(mockedCheckbox.checked).toBe(false);
});

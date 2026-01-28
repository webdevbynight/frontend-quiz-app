import { expect, it } from "vitest";

import { updateModeChoice } from "../../ts/mode-choice/update-mode-choice.js";

it("should update the UI with light mode if chosen", () => {
  updateModeChoice("light");
  expect(document.documentElement.dataset.modeChoice).toBe("light");
});
it("should update the UI with dark mode if chosen", () => {
  updateModeChoice("dark");
  expect(document.documentElement.dataset.modeChoice).toBe("dark");
});

import { getModeChoice } from "./get-mode-choice.js";
import { updateModeChoice } from "./update-mode-choice.js";

/**
 * Initialises the mode choice according to the user’s preference or the mode choice stored in storage.
 * @param checkbox - The checkbox managing the mode choice.
 */
export const initModeChoice = (checkbox: HTMLInputElement): void => {
  const modeChoice = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : getModeChoice();
  updateModeChoice(modeChoice);
  checkbox.checked = modeChoice === "dark";
};

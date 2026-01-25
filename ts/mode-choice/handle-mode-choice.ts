import { persistModeChoice } from "./persist-mode-choice.js";
import { updateModeChoice } from "./update-mode-choice.js";

/**
 * Handles the mode choice form submission and updates the chosen mode.
 * @param checkbox - The checkbox managing the mode choice.
 */
export const handleModeChoice = (checkbox: HTMLInputElement): void => {
  checkbox.addEventListener("change", () => {
    const modeChoice = checkbox.checked ? "dark" : "light";
    updateModeChoice(modeChoice);
    persistModeChoice(modeChoice);
  });
};

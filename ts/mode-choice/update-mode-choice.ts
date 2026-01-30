import type { ModeChoice } from "../types.js";

/**
 * Updates the mode choice in UI.
 * @param modeChoice - The chosen mode.
 */
export const updateModeChoice = (modeChoice: ModeChoice): void => {
  document.documentElement.dataset.modeChoice = modeChoice;
};

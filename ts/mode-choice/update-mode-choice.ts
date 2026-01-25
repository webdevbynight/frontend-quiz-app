import type { Storage } from "../types.js";

/**
 * Updates the mode choice in UI.
 * @param modeChoice - The chosen mode.
 */
export const updateModeChoice = (modeChoice: Storage["modeChoice"]): void => {
  document.documentElement.dataset.modeChoice = modeChoice;
};

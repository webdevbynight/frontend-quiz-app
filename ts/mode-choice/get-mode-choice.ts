import type { ModeChoice, Storage } from "../types.js";

import { getStorage } from "../utils/get-storage.js";

/**
 * Gets the mode choice from storage.
 * @returns The mode choice stored in storage if found, `"light"` otherwise.
 */
export const getModeChoice = (): ModeChoice => {
  const storage = getStorage();
  if (storage) {
    const storageData: Storage = JSON.parse(storage);
    const { modeChoice } = storageData;
    return modeChoice;
  }
  return "light";
};

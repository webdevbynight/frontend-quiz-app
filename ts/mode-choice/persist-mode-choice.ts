import type { ModeChoice, Storage } from "../types.js";

import { getStorage } from "../utils/get-storage.js";

import { STORAGE_ITEM_NAME } from "../utils/constants.js";

/**
 * Persists the mode choice in storage.
 * @param modeChoice - The chosen mode.
 */
export const persistModeChoice = (modeChoice: ModeChoice): void => {
  const storage = getStorage();
  const storageData: Storage = storage ? JSON.parse(storage) : {};
  localStorage.setItem(STORAGE_ITEM_NAME, JSON.stringify({ ...storageData, modeChoice }));
};

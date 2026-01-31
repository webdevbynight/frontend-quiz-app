import type { StorageData } from "../types.js";

import { getStorage } from "./get-storage.js";

import { STORAGE_ITEM_NAME } from "./constants.js";

/**
 * Removes the selected subject from storage.
 */
export const removeSelectedSubject = (): void => {
  const storage = getStorage();
  if (storage) {
    const storageData: StorageData = JSON.parse(storage);
    const { modeChoice, quiz } = storageData;
    if (quiz) localStorage.setItem(STORAGE_ITEM_NAME, JSON.stringify({ modeChoice }));
  }
};

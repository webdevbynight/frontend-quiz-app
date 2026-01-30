import type { QuizStorageData } from "../types.js";

import { getStorage } from "./get-storage.js";

import { STORAGE_ITEM_NAME } from "./constants.js";

/**
 * Stores the selected subject in storage.
 * @param subjectData - The selected subject.
 */
export const storeSelectedSubject = (subjectData: QuizStorageData): void => {
  const storage = getStorage();
  if (storage) {
    const storageData = JSON.parse(storage);
    localStorage.setItem(STORAGE_ITEM_NAME, JSON.stringify({ ...storageData, quiz: subjectData }));
  }
};

import type { StorageData } from "../types.js";

import { getStorage } from "./get-storage.js";

/**
 * Sets the context of the page based on the data stored in storage.
 */
export const setContext = (): void => {
  const storage = getStorage();
  let context: string;
  if (storage) {
    const storageData: StorageData = JSON.parse(storage);
    const { quiz } = storageData;
    if (quiz) {
      const { isCompleted } = quiz;
      context = isCompleted ? "score" : "question";
    } else context = "start";
  } else context = "start";
  document.body.dataset.context = context;
};

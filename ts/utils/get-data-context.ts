import type { DataContext, StorageData } from "../types.js";

import { STORAGE_ITEM_NAME } from "./constants.js";

/**
 * Gets the data context from storage.
 * @returns The data context stored in storage if found, the start context otherwise.
 */
export const getDataContext = (): DataContext => {
  const storage = localStorage.getItem(STORAGE_ITEM_NAME);
  if (storage) {
    const storageData: StorageData = JSON.parse(storage);
    const { quiz } = storageData;
    if (quiz) {
      const { id, title, themeColour, isCompleted, questions } = quiz;
      if (isCompleted) return { context: "score", subject: id, title, themeColour };
      return {
        context: "question",
        subject: id,
        title,
        themeColour,
        question: questions.find(question => !question.isAnswered)?.id ?? 0,
        questions: questions.length
      };
    }
    return { context: "start" };
  }
  return { context: "start" };
};

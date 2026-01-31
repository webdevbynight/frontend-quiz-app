import type { StorageData } from "../types.js";

import { getStorage } from "./get-storage.js";

/**
 * Gets the score of the selected subject.
 * @param subjectId - The id of the selected subject.
 * @return The number of correct answers and the total number of questions.
 */
export const getScore = (subjectId: string): [number, number] => {
  const storage = getStorage();
  if (storage) {
    const storageData: StorageData = JSON.parse(storage);
    const { quiz } = storageData;
    if (quiz) {
      const { id, questions } = quiz;
      if (id === subjectId) {
        const correctAnswers = questions.filter(question => question.isAnswerCorrect).length;
        return [correctAnswers, questions.length];
      }
    }
  }
  return [0, 0];
};

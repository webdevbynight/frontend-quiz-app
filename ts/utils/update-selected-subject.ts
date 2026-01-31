import type { StorageData } from "../types.js";

import { getStorage } from "./get-storage.js";

import { STORAGE_ITEM_NAME } from "./constants.js";

/**
 * Updates the selected subject in storage.
 * @param subjectId - The id of the selected subject.
 * @param questionId - The id of the question that was answered.
 * @param isAnswerCorrect - Whether the answer was correct or not.
 */
export const updateSelectedSubject = (subjectId: string, questionId: number, isAnswerCorrect: boolean): void => {
  const storage = getStorage();
  if (storage) {
    const storageData: StorageData = JSON.parse(storage);
    const { quiz } = storageData;
    if (quiz) {
      const { id, questions } = quiz;
      if (id === subjectId) {
        const questionToUpdate = questions.find(question => question.id === questionId);
        if (questionToUpdate) {
          questionToUpdate.isAnswered = true;
          questionToUpdate.isAnswerCorrect = isAnswerCorrect;
          const lastQuestionId = questions[questions.length - 1]?.id;
          const updatedQuestions = questions.map(question => (question.id === questionId ? questionToUpdate : question));
          const updatedQuiz = { ...quiz, isCompleted: questionId === lastQuestionId, questions: updatedQuestions };
          localStorage.setItem(STORAGE_ITEM_NAME, JSON.stringify({ ...storageData, quiz: updatedQuiz }));
        }
      }
    }
  }
};

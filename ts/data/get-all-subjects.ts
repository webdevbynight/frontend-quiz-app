import type { QuizSubject } from "../types.js";

import { requestData } from "./request-data.js";

/**
 * Gets all the subjects from the quiz data.
 * @return The subjects (ID, title, icon and theme colour).
 */
export const getAllSubjects = async (): Promise<QuizSubject[]> => {
  const quizData = await requestData();
  const { quizzes } = quizData;
  return quizzes.map(quiz => ({
    id: quiz.id,
    title: quiz.title,
    icon: quiz.icon,
    themeColour: quiz.themeColour,
    questions: quiz.questions.length
  }));
};

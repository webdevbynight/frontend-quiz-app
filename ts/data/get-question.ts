import type { QuizDataQuestion } from "../types.js";

import { requestData } from "./request-data.js";

/**
 * Gets a question from the quiz data.
 * @param quizId - The title of the quiz currently being played.
 * @param questionNumber - The number of the question to get.
 * @return The question data without the ID and the answer.
 */
export const getQuestion = async (quizId: string, questionNumber: number): Promise<Omit<QuizDataQuestion, "id" | "answer">> => {
  const quizData = await requestData();
  const quiz = quizData.quizzes.find(quiz => quiz.id === quizId);
  if (quiz) {
    const question = quiz.questions.find(question => question.id === questionNumber);
    if (question) {
      const { title, options } = question;
      return { title, options };
    }
    throw new Error(`Question ${questionNumber} not found in quiz \`${quizId}\``);
  }
  throw new Error(`Quiz with id \`${quizId}\` not found`);
};

import { requestData } from "./request-data.js";

/**
 * Gets the answer for a question.
 * @param quizId - The title of the quiz currently being played.
 * @param questionNumber - The number of the question to get the answer for.
 * @return The index of the answer in the options array.
 */
export const getAnswer = async (quizId: string, questionNumber: number): Promise<number> => {
  const quizData = await requestData();
  const quiz = quizData.quizzes.find(quiz => quiz.id === quizId);
  if (quiz) {
    const question = quiz.questions.find(question => question.id === questionNumber);
    if (question) {
      const { options, answer } = question;
      if (options.includes(answer)) return options.indexOf(answer);
      throw new Error(`Answer not found for question ${questionNumber} in quiz \`${quizId}\``);
    }
    throw new Error(`Question ${questionNumber} not found in quiz \`${quizId}\``);
  }
  throw new Error(`Quiz with id \`${quizId}\` not found`);
};

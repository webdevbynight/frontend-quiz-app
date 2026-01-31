import type { QuizData } from "../types.js";

import { DATA_REQUEST_URL } from "../utils/constants.js";

/**
 * Requests the quiz data from the server.
 * @returns The quiz data if found.
 */
export const requestData = async (): Promise<QuizData> => {
  const response = await fetch(DATA_REQUEST_URL);
  const { ok, status, statusText } = response;
  if (ok && status === 200) return await response.json();
  throw new Error(`Failed to fetch data: ${status}: ${statusText}`);
};

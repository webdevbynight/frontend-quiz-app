import type { DataContext } from "../types.js";

/**
 * Sets the title of the page based on the current context.
 * @param dataContext - The current context.
 */
export const setTitle = (dataContext: DataContext): void => {
  const { context } = dataContext;
  switch (context) {
    case "score":
      document.title = `Quiz completed — ${dataContext.title} — Frontend Quiz`;
      break;
    case "question":
      document.title = `Question ${dataContext.question} of ${dataContext.questions} — ${dataContext.title} — Frontend Quiz`;
      break;
    default:
      document.title = "Frontend Quiz";
      break;
  }
};

import type { DataContext } from "../types.js";

export const setSubjectThemeColourStyle = (dataContext: DataContext): void => {
  const { context } = dataContext;
  if (context !== "start") {
    const { themeColour } = dataContext;
    document.body.style.setProperty("--subject-theme-colour", themeColour);
  }
};

import type { DataContext } from "../types.js";

/**
 * Sets the header of the page.
 * @param dataContext - The current data context.
 * @return The `header` element with all its appropriate children.
 */
export const setHeader = (dataContext: DataContext): HTMLElement => {
  const { context } = dataContext;
  const header = document.createElement("header");
  header.id = "header";
  const h1 = document.createElement("h1");
  h1.innerHTML = context === "start" ? '<span class="welcome">Welcome to the</span> <span class="app-name">Frontend Quiz!</span>' : `<img src="./images/icon-${dataContext.subject}.svg" alt="" width="56" height="56"> ${dataContext.title}`;
  const headingP = document.createElement("p");
  headingP.textContent = "Pick a subject to get started.";
  const form = document.createElement("form");
  const formP = document.createElement("p");
  const formInput = document.createElement("input");
  formInput.id = "mode-choice";
  formInput.name = "mode-choice";
  formInput.type = "checkbox";
  const formLabel = document.createElement("label");
  formLabel.htmlFor = "mode-choice";
  formLabel.innerHTML = '<span class="sr-only">Switch to dark mode</span>';
  formP.appendChild(formInput);
  formP.appendChild(formLabel);
  form.appendChild(formP);
  header.appendChild(h1);
  if (context === "start") header.appendChild(headingP);
  header.appendChild(form);
  return header;
};

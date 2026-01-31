import { handleModeChoice } from "./mode-choice/handle-mode-choice.js";
import { initModeChoice } from "./mode-choice/init-mode-choice.js";
import { fillBody } from "./ui/fill-body.js";
import { setSubjectThemeColourStyle } from "./ui/set-subject-theme-colour-style.js";
import { setTitle } from "./ui/set-title.js";
import { getDataContext } from "./utils/get-data-context.js";
import { setContext } from "./utils/set-context.js";

document.addEventListener("DOMContentLoaded", async () => {
  const dataContext = getDataContext();
  setContext();
  setSubjectThemeColourStyle(dataContext);
  setTitle(dataContext);
  await fillBody(document.body, dataContext);
  const modeChoiceCheckbox = document.querySelector<HTMLInputElement>("#header input[type='checkbox']");
  if (modeChoiceCheckbox) {
    initModeChoice(modeChoiceCheckbox);
    handleModeChoice(modeChoiceCheckbox);
  }
});

import { handleModeChoice } from "./mode-choice/handle-mode-choice.js";
import { initModeChoice } from "./mode-choice/init-mode-choice.js";

document.addEventListener("DOMContentLoaded", () => {
  const modeChoiceCheckbox = document.querySelector<HTMLInputElement>("#header input[type='checkbox']");
  if (modeChoiceCheckbox) {
    initModeChoice(modeChoiceCheckbox);
    handleModeChoice(modeChoiceCheckbox);
  }
});

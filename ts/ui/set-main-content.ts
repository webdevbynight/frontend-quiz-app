import type { DataContext } from "../types.js";

import { getAllSubjects } from "../data/get-all-subjects.js";
import { getAnswer } from "../data/get-answer.js";
import { getQuestion } from "../data/get-question.js";
import { indexToLetter } from "../utils/index-to-letter.js";
import { storeSelectedSubject } from "../utils/store-selected-subject.js";
import { stringToKebabCase } from "../utils/string-to-kebab-case.js";
import { updateSelectedSubject } from "../utils/update-selected-subject.js";

/**
 * Sets the main content of the page.
 * @param dataContext - The current data context.
 * @return The `main` element with all its appropriate children.
 */
export const setMainContent = async (dataContext: DataContext): Promise<HTMLElement> => {
  const { context } = dataContext;
  const main = document.createElement("main");
  if (context === "score") {
    /*
    <main id="score">
      <header>
        <h2>Quiz completed</h2>
        <p>You scored…</p>
      </header>
      <div>
        <p><span class="subject"><img src="./images/icon-accessibility.svg" alt="" width="56" height="56"> Accessibility</span> <span class="score-note">8</span> out of 10</p>
        <p><a class="button" href="./">Play Again</a></p>
      </div>
    </main>
    */
  } else if (context === "question") {
    const { subject, question, questions } = dataContext;
    const questionData = await getQuestion(subject, question);
    const { title, options } = questionData;
    main.id = "question";
    const whiteSpace = document.createTextNode(" ");
    const header = document.createElement("header");
    const h2 = document.createElement("h2");
    const questionNumber = document.createElement("span");
    questionNumber.className = "question-number";
    questionNumber.textContent = `Question ${question} of ${questions}`;
    h2.appendChild(questionNumber);
    h2.appendChild(whiteSpace);
    h2.appendChild(document.createTextNode(title));
    const headerP = document.createElement("p");
    const progress = document.createElement("progress");
    progress.setAttribute("aria-label", `Question progress: ${question} of ${questions}`);
    progress.value = question;
    progress.max = questions;
    headerP.appendChild(progress);
    header.appendChild(h2);
    header.appendChild(headerP);
    const answerName = `${subject}-question-${question}-answer`;
    const form = document.createElement("form");
    form.method = "post";
    form.action = "./";
    form.addEventListener("input", function () {
      const inputSubmit = this.querySelector("input[type='submit']");
      if (inputSubmit) inputSubmit.classList.remove("unanswered");
    });
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      const formData = new FormData(this);
      const questionAnswered = formData.get("question-answered");
      if (questionAnswered === "false") {
        const errorMessage = this.querySelector(".error-message");
        if (formData.has(answerName)) {
          const answer = Number(formData.get(answerName)) ?? -1;
          const rightAnswer = await getAnswer(subject, question);
          const isAnswerCorrect = answer === rightAnswer;
          const options = this.querySelectorAll(".answers li");
          for (const option of options) {
            const inputRadio = option.querySelector<HTMLInputElement>("input[type='radio']");
            if (inputRadio) inputRadio.disabled = true;
          }
          const proposedAnswer = options[answer];
          const correctAnswer = options[rightAnswer];
          const resultMessage = this.querySelector(".result");
          const inputQuestionAnswered = this.querySelector<HTMLInputElement>("input[name='question-answered']");
          const inputQuestionCorrect = this.querySelector<HTMLInputElement>("input[name='question-correct']");
          const inputSubmit = this.querySelector<HTMLInputElement>("input[type='submit']");
          if (proposedAnswer && correctAnswer && resultMessage && inputQuestionAnswered && inputQuestionCorrect && inputSubmit) {
            proposedAnswer.classList.add("proposed-answer");
            if (isAnswerCorrect) proposedAnswer.classList.add("correct-answer");
            else {
              proposedAnswer.classList.add("incorrect-answer");
              correctAnswer.classList.add("correct-answer");
            }
            resultMessage.textContent = isAnswerCorrect ? "Your answer is correct!" : `Your answer is incorrect! You have answered the answer ${indexToLetter(answer)}, while the correct answer is ${indexToLetter(rightAnswer)}.`;
            inputQuestionAnswered.value = "true";
            inputQuestionCorrect.value = String(isAnswerCorrect);
            inputSubmit.value = "Next Question";
          }
          if (errorMessage) errorMessage.textContent = "";
        } else {
          if (errorMessage) errorMessage.textContent = "Please select an answer.";
        }
      } else if (questionAnswered === "true") {
        updateSelectedSubject(subject, question, formData.get("question-correct") === "true");
        window.location.href = "./";
      }
    });
    if (options.length) {
      const ol = document.createElement("ol");
      ol.className = "answers";
      options.forEach((option, index) => {
        const li = document.createElement("li");
        const input = document.createElement("input");
        input.id = `${subject}-question-${question}-answer-${index + 1}`;
        input.name = answerName;
        input.type = "radio";
        input.value = String(index);
        const label = document.createElement("label");
        label.htmlFor = input.id;
        label.textContent = option;
        li.appendChild(input);
        li.appendChild(whiteSpace);
        li.appendChild(label);
        ol.appendChild(li);
      });
      form.appendChild(ol);
    }
    const formErrorMessage = document.createElement("p");
    formErrorMessage.className = "error-message";
    formErrorMessage.setAttribute("aria-live", "assertive");
    const formResult = document.createElement("p");
    formResult.className = "result sr-only";
    formResult.setAttribute("aria-live", "assertive");
    const formP = document.createElement("p");
    const formInputHiddenContext = document.createElement("input");
    formInputHiddenContext.name = "question-context";
    formInputHiddenContext.type = "hidden";
    formInputHiddenContext.value = `${subject}-question-${question}`;
    const formInputHiddenAnswered = document.createElement("input");
    formInputHiddenAnswered.name = "question-answered";
    formInputHiddenAnswered.type = "hidden";
    formInputHiddenAnswered.value = "false";
    const formInputHiddenCorrect = document.createElement("input");
    formInputHiddenCorrect.name = "question-correct";
    formInputHiddenCorrect.type = "hidden";
    formInputHiddenCorrect.value = "false";
    const formInputSubmit = document.createElement("input");
    formInputSubmit.className = "unanswered";
    formInputSubmit.type = "submit";
    formInputSubmit.value = "Submit Answer";
    formP.appendChild(formInputHiddenContext);
    formP.appendChild(formInputHiddenAnswered);
    formP.appendChild(formInputHiddenCorrect);
    formP.appendChild(formInputSubmit);
    form.appendChild(formErrorMessage);
    form.appendChild(formResult);
    form.appendChild(formP);
    main.appendChild(header);
    main.appendChild(form);
  } else {
    const quizzes = await getAllSubjects();
    if (quizzes.length) {
      const nav = document.createElement("nav");
      const ul = document.createElement("ul");
      ul.className = "subjects";
      for (const quiz of quizzes) {
        const { id, title, icon, questions, themeColour } = quiz;
        const subject = stringToKebabCase(title);
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.addEventListener("click", () => {
          storeSelectedSubject({
            id,
            title,
            themeColour,
            isCompleted: false,
            questions: Array.from({ length: questions }, (_, index) => ({ id: index + 1, isAnswered: false, isAnswerCorrect: false }))
          });
        });
        a.href = "./";
        a.dataset.title = title;
        a.dataset.subject = subject;
        a.innerHTML = `<img src="${icon}" alt="" width="56" height="56"> ${title}`;
        li.appendChild(a);
        ul.appendChild(li);
      }
      nav.appendChild(ul);
      main.appendChild(nav);
    }
  }
  return main;
};

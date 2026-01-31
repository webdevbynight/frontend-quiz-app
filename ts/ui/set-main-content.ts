import type { DataContext } from "../types.js";

import { getAllSubjects } from "../data/get-all-subjects.js";
import { storeSelectedSubject } from "../utils/store-selected-subject.js";
import { stringToKebabCase } from "../utils/string-to-kebab-case.js";

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
    main.id = "question";
    const header = document.createElement("header");
    const h2 = document.createElement("h2");
    h2.innerHTML = `<span class="question-number">Question ${question} of ${questions}</span> Which of these colour contrast ratios defines the minimum WCAG 2.1 Level AA requirement for normal text?`;
    const headerP = document.createElement("p");
    const progress = document.createElement("progress");
    progress.setAttribute("aria-label", `Question progress: ${question} of ${questions}`);
    progress.value = question;
    progress.max = questions;
    headerP.appendChild(progress);
    header.appendChild(h2);
    header.appendChild(headerP);
    const form = document.createElement("form");
    form.method = "post";
    form.action = "./";
    const formP = document.createElement("p");
    const formInputHiddenContext = document.createElement("input");
    formInputHiddenContext.name = "question-context";
    formInputHiddenContext.type = "hidden";
    formInputHiddenContext.value = `${subject}-question-${question}`;
    const formInputHiddenAnswered = document.createElement("input");
    formInputHiddenAnswered.name = "question-answered";
    formInputHiddenAnswered.type = "hidden";
    formInputHiddenAnswered.value = "false";
    const formInputSubmit = document.createElement("input");
    formInputSubmit.className = "unanswered";
    formInputSubmit.type = "submit";
    formInputSubmit.value = "Submit Answer";
    formP.appendChild(formInputHiddenContext);
    formP.appendChild(formInputHiddenAnswered);
    formP.appendChild(formInputSubmit);
    form.appendChild(formP);
    main.appendChild(header);
    main.appendChild(form);
    /*
    <main id="question">
      <header>
        <h2><span class="question-number">Question 6 of 10</span> Which of these colour contrast ratios defines the minimum WCAG 2.1 Level AA requirement for normal text?</h2>
        <p><progress value="6" max="10" aria-label="Question progress"></progress></p>
      </header>
      <form method="post">
        <ol class="answers">
          <li><input id="accessibility-question-6-answer-1" name="accessibility-question-6-answer" type="radio"> <label for="accessibility-question-6-answer-1">4.5:1</label></li>
          <li><input id="accessibility-question-6-answer-2" name="accessibility-question-6-answer" type="radio"> <label for="accessibility-question-6-answer-2">3:1</label></li>
          <li><input id="accessibility-question-6-answer-3" name="accessibility-question-6-answer" type="radio"> <label for="accessibility-question-6-answer-3">2.5:1</label></li>
          <li><input id="accessibility-question-6-answer-4" name="accessibility-question-6-answer" type="radio"> <label for="accessibility-question-6-answer-4">5:1</label></li>
        </ol>
        <p>
          <input name="question-context" type="hidden" value="accessibility-question-6">
          <input name="question-answered" type="hidden" value="false">
          <input class="unanswered" type="submit" value="Submit Answer">
        </p>
      </form>
    </main>
    */
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
            questions: Array.from({ length: questions }, (_, index) => ({ id: index + 1, isAnswered: false }))
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

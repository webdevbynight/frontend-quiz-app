import type { DataContext, QuizData } from "../types.js";

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
    const nav = document.createElement("nav");
    const quizResource = await fetch("./data/data.json");
    const { status, ok } = quizResource;
    if (ok && status === 200) {
      const quizData: QuizData = await quizResource.json();
      const { quizzes } = quizData;
      if (quizzes.length) {
        const ul = document.createElement("ul");
        ul.className = "subjects";
        for (const quiz of quizzes) {
          const { title, icon } = quiz;
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.href = "./";
          a.dataset.title = title;
          a.dataset.subject = stringToKebabCase(title);
          a.innerHTML = `<img src="${icon}" alt="" width="56" height="56"> ${title}`;
          li.appendChild(a);
          ul.appendChild(li);
        }
        nav.appendChild(ul);
      }
    }
    main.appendChild(nav);
  }
  return main;
};

const hexadecimalDigit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"] as const;
type HexadecimalDigit = (typeof hexadecimalDigit)[number];
export type QuizData = {
  quizzes: {
    title: string;
    icon: string;
    "theme-colour": `#${HexadecimalDigit}`;
    questions: {
      question: string;
      options: string[];
      answer: string;
    }[];
  }[];
};
export type ModeChoice = "light" | "dark";
export type StorageData = {
  modeChoice: ModeChoice;
  quiz?: {
    title: string;
    subject: string;
    isCompleted: boolean;
    questions: {
      id: number;
      isAnswered: boolean;
    }[];
  };
};
type DataStartContext = {
  context: "start";
};
type DataQuestionContext = {
  context: "question";
  title: string;
  subject: string;
  question: number;
  questions: number;
};
type DataScoreContext = {
  context: "score";
  title: string;
  subject: string;
};
export type DataContext = DataStartContext | DataQuestionContext | DataScoreContext;

type ThemeColour = `#${string}`;
export type QuizDataQuestion = {
  id: number;
  title: string;
  options: string[];
  answer: string;
};
export type QuizData = {
  quizzes: {
    id: string;
    title: string;
    icon: string;
    themeColour: ThemeColour;
    questions: QuizDataQuestion[];
  }[];
};
export type QuizSubject = {
  id: string;
  title: string;
  icon: string;
  themeColour: ThemeColour;
  questions: number;
};
export type ModeChoice = "light" | "dark";
export type QuizStorageData = {
  id: string;
  title: string;
  themeColour: ThemeColour;
  isCompleted: boolean;
  questions: {
    id: number;
    isAnswered: boolean;
  }[];
};
export type StorageData = {
  modeChoice: ModeChoice;
  quiz?: QuizStorageData;
};
type DataStartContext = {
  context: "start";
};
type DataQuestionContext = {
  context: "question";
  subject: string;
  title: string;
  themeColour: ThemeColour;
  question: number;
  questions: number;
};
type DataScoreContext = {
  context: "score";
  subject: string;
  title: string;
  themeColour: ThemeColour;
};
export type DataContext = DataStartContext | DataQuestionContext | DataScoreContext;

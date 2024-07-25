import { IQuestion } from "./iquestion";

export interface IQuiz {
  id: number;
  numOfQuestions: number;
  degree: number;
  quizState: boolean;
  minDegree: number;
  isDeleted: boolean;
  courseId: number;
  question: IQuestion[];

}

import { IAnswer } from "./ianswer";

export interface IQuestion {
  id: number;
  content: string;
  type: number;
  degree: number;
  answers: IAnswer[] | null
}

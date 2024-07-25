export interface IAnswer {
  id: number;
  content: string | null;
  isCorrect: boolean;
  questionId: number | null;
}

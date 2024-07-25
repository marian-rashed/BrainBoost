class insertedChoice {
  Choice: string = "";
  isCorrect: boolean = false;
}
class insertedQuestion {
  HeadLine: string = "";
  Degree: number = 0;
  Choices: insertedChoice[] = [];
}

export class InsertedQuiz {
  NumOfQuestions: number = 0;
  Degree: number = 0;
  MinDegree: number = 0;
  Questions: insertedQuestion[] = [];
}

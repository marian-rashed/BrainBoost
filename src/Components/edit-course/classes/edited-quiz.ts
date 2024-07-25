class EditedChoice {
  Id:number=0
  Choice: string = "";
  isCorrect: boolean = false;
}
class EditedQuestion {
  Id:number=0
  HeadLine: string = "";
  Degree: number = 0;
  Choices: EditedChoice[] = [];
}

export class EditedQuiz {
  Id:number=0
  NumOfQuestions: number = 0;
  Degree: number = 0;
  MinDegree: number = 0;
  Questions: EditedQuestion[] = [];
}

import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { QuizService } from "../../../Services/quiz.service";
@Component({
  selector: "app-edit-course-questions",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: "./edit-course-questions.component.html",
  styleUrl: "./edit-course-questions.component.css",
})
export class EditCourseQuestionsComponent implements OnChanges {
  @Input() courseId!: number;
  @Input() courseQuestionsForm!: FormArray<FormGroup>;
  constructor(private quizzService: QuizService) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.quizzService.getQuiz(this.courseId).subscribe({
      next: (response) => {
        response.forEach((q) => {
          let editedQuestion = new FormGroup({
            id: new FormControl<string>(q["id"]),
            headLine: new FormControl<string>(
              q["content"],
              Validators.required
            ),
            answers: new FormArray<FormGroup>([], Validators.required),
            rightAnswer: new FormControl<string>("", Validators.required),
            degree: new FormControl<number>(q["degree"], Validators.required),
          });
          q["answers"].forEach((a: any) => {
            editedQuestion.controls.answers.push(
              new FormGroup(
                {
                  id: new FormControl<string>(a["id"]),
                  answer: new FormControl<string>(
                    a["content"],
                    Validators.required
                  ),
                },
                Validators.required
              )
            );
            if (a["isCorrect"]) {
              editedQuestion.controls.rightAnswer.setValue(a["content"]);
            }
          });
          this.courseQuestionsForm.push(editedQuestion);
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addNewQuestion() {
    this.courseQuestionsForm.push(
      new FormGroup({
        id: new FormControl<number>(0),
        headLine: new FormControl<string>("", Validators.required),
        answers: new FormArray<FormGroup>(
          [
            new FormGroup(
              {
                id: new FormControl<number>(0),
                answer: new FormControl<string>("", Validators.required),
              },
              Validators.required
            ),
            new FormGroup(
              {
                id: new FormControl<number>(0),
                answer: new FormControl<string>("", Validators.required),
              },
              Validators.required
            ),
          ],
          Validators.minLength(2)
        ),
        rightAnswer: new FormControl<string>("", Validators.required),
        degree: new FormControl<number>(0, Validators.required),
      })
    );
  }
  getCourseQuizzDegree(): number {
    let quizDegree = 0;
    this.courseQuestionsForm.controls.forEach((formGroup) => {
      quizDegree += formGroup.get("degree")?.value;
    });
    return quizDegree;
  }
  getAnswers(questionIndex: number): FormArray {
    return this.courseQuestionsForm
      .at(questionIndex)
      .get("answers") as FormArray;
  }
  getAnswerControl(questionIndex: number, answerIndex: number): FormControl {
    let form = this.courseQuestionsForm
      .at(questionIndex)
      .get("answers")
      ?.get(`${answerIndex}`) as FormGroup;
    return form.controls["answer"] as FormControl;
  }
  setTheRightAnswer(questionIndex: number, answerIndex: number) {
    let answer = this.getAnswers(questionIndex).at(answerIndex) as FormGroup;
    this.courseQuestionsForm
      .at(questionIndex)
      .controls["rightAnswer"].setValue(answer.controls["answer"].value);
  }
  checkIfAnswerIsRight(questionIndex: number, answerIndex: number): boolean {
    let rightAnswer =
      this.getAnswers(questionIndex).at(answerIndex).value["answer"];
    let userAnswer =
      this.courseQuestionsForm.at(questionIndex).controls["rightAnswer"].value;
    return rightAnswer == userAnswer;
  }
  deleteChoice(questionIndex: number, answerIndex: number) {
    this.getAnswers(questionIndex).removeAt(answerIndex);
    let answer = this.getAnswers(questionIndex).at(answerIndex).value;
    if (
      answer ===
      this.courseQuestionsForm.at(questionIndex).controls["rightAnswer"].value
    )
      this.courseQuestionsForm
        .at(questionIndex)
        .controls["rightAnswer"].setValue(null);
  }
  addChoice(questionIndex: number) {
    this.getAnswers(questionIndex).push(
      new FormGroup(
        {
          id: new FormControl<number>(0),
          answer: new FormControl<string>("", Validators.required),
        },
        Validators.required
      )
    );
  }
}

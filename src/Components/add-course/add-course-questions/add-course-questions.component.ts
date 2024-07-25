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
@Component({
  selector: "app-add-course-questions",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: "./add-course-questions.component.html",
  styleUrl: "./add-course-questions.component.css",
})
export class AddCourseQuestionsComponent {
  @Input() courseQuestionsForm!: FormArray<FormGroup>;
  addNewQuestion() {
    this.courseQuestionsForm.push(
      new FormGroup({
        headLine: new FormControl<string>("", Validators.required),
        answers: new FormArray<FormControl>(
          [
            new FormControl("", Validators.required),
            new FormControl("", Validators.required),
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
    return this.courseQuestionsForm
      .at(questionIndex)
      .get("answers")
      ?.get(`${answerIndex}`) as FormControl;
  }
  setTheRightAnswer(questionIndex: number, answerIndex: number) {
    let answer = this.getAnswers(questionIndex).at(answerIndex).value;
    this.courseQuestionsForm
      .at(questionIndex)
      .controls["rightAnswer"].setValue(answer);
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
      new FormControl("", Validators.required)
    );
  }
}

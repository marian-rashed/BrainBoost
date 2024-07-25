import { Component } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatStepperModule } from "@angular/material/stepper";
import { CommonModule } from "@angular/common";
import { AddCourseDetailsComponent } from "./add-course-details/add-course-details.component";
import { AddCourseVideosComponent } from "./add-course-videos/add-course-videos.component";
import { CourseServiceService } from "../../Services/course/course-service.service";
import { AddCourseQuestionsComponent } from "./add-course-questions/add-course-questions.component";
import { InsertedQuiz } from "./classes/inserted-quiz";
import { AddCourseWhatToLearnComponent } from "./add-course-what-to-learn/add-course-what-to-learn.component";
import { FaLayersCounterComponent } from "@fortawesome/angular-fontawesome";
import { AuthService } from "../../Services/auth.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-add-course",
  standalone: true,
  templateUrl: "./add-course.component.html",
  styleUrl: "./add-course.component.css",
  imports: [
    AddCourseDetailsComponent,
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AddCourseVideosComponent,
    AddCourseQuestionsComponent,
    AddCourseWhatToLearnComponent,
  ],
})
export class AddCourseComponent {
  constructor(
    private courseService: CourseServiceService,
    private authService: AuthService
  ) {}
  Quiz: InsertedQuiz = new InsertedQuiz();
  WhatToLearn!: string[];
  courseDetailsForm = new FormGroup({
    courseName: new FormControl("", Validators.required),
    courseDescription: new FormControl("", Validators.required),
    price: new FormControl<number | null>(null, Validators.required),
    categoryName: new FormControl("", Validators.required),
    courseLanguage: new FormControl("", Validators.required),
    courseLevel: new FormControl("", Validators.required),
  });
  courseWhatToLearnForm = new FormArray<FormControl>(
    [new FormControl<string>("", Validators.required)],
    Validators.minLength(1)
  );
  addWhatToLearn() {
    this.WhatToLearn = [];
    this.courseWhatToLearnForm.controls.forEach((point) => {
      this.WhatToLearn.push(point.value);
    });
  }
  coursePhoto = new FormControl<File | null>(null, Validators.required);
  courseMediaForm = new FormArray<FormGroup>(
    [
      new FormGroup({
        videoFile: new FormControl<File | null>(null, Validators.required),
        title: new FormControl<string | null>(null, Validators.required),
      }),
    ],
    Validators.minLength(1)
  );
  courseScheduleForm = new FormArray<FormArray>([
    new FormArray<FormGroup>([
      new FormGroup({
        videoFile: new FormControl<File | null>(null, Validators.required),
        title: new FormControl<string | null>(null, Validators.required),
      }),
    ]),
  ]);
  courseQuestionsForm = new FormArray<FormGroup>(
    [
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
        degree: new FormControl<number | null>(null, Validators.required),
      }),
    ],
    [Validators.minLength(1)]
  );
  addCourseLectures(courseId: number) {
    this.courseScheduleForm.controls.forEach((chapter, chapterindex) => {
      chapter.controls.forEach((lecture, lectureindex) => {
        const formdata = new FormData();
        formdata.append("Title", lecture.get("title")?.value);
        formdata.append("VideoFile", lecture.get("videoFile")?.value);
        formdata.append("Chapter", (chapterindex + 1).toString());
        this.courseService.addVideo(formdata, courseId).subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => {
            console.log(error);
          },
        });
        // Swal.fire({
        //   title: "Done",
        //   text: "course added successfully",
        //   showCancelButton: true,
        // }).then((result) => {
        //   if (result.isConfirmed || result.isDismissed) {
        //     window.location.reload();
        //   }
        // });
      });

    });
  }
  addCoursePhoto(courseId: number, typeStore: string, FolderName: string) {
    this.courseService
      .uploadPhoto(this.coursePhoto.value!, courseId, typeStore, FolderName)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  addCourseQuiz() {
    console.log(this.courseQuestionsForm);
    this.courseQuestionsForm.controls.forEach((FormGroup, questionsIndex) => {
      this.Quiz.NumOfQuestions++;
      this.Quiz.Degree += FormGroup.controls["degree"].value;
      this.Quiz.Questions.push({
        HeadLine: FormGroup.controls["headLine"].value,
        Degree: FormGroup.controls["degree"].value,
        Choices: [],
      });
      let answers = FormGroup.controls["answers"] as FormArray;
      answers.controls.forEach((answer, answerIndex) => {
        this.Quiz.Questions[questionsIndex].Choices.push({
          Choice: answer.value,
          isCorrect: false,
        });
        if (answer.value == FormGroup.controls["rightAnswer"].value) {
          this.Quiz.Questions[questionsIndex].Choices[answerIndex].isCorrect =
            true;
        }
      });
    });
  }
  addCourse() {
    this.addCourseQuiz();
    this.addWhatToLearn();
    const CoursePhoto = new FormData();
    CoursePhoto.append("CoursePhoto", this.coursePhoto.value!);
    this.courseService
      .addCourse({
        Name: this.courseDetailsForm.value.courseName!,
        Description: this.courseDetailsForm.value.courseDescription!,
        Price: this.courseDetailsForm.value.price!,
        TeacherId: this.authService.userData.value["roleId"],
        CategoryName: this.courseDetailsForm.value.categoryName!,
        Level: this.courseDetailsForm.value.courseLevel!,
        CertificateHeadline: "string",
        CertificateAppreciationParagraph: "string",
        Language: this.courseDetailsForm.value.courseLanguage!,
        Quiz: this.Quiz,
        WhatToLearn: this.WhatToLearn,
        CoursePhoto: CoursePhoto.get("CoursePhoto"),
      })
      .subscribe({
        next: (response) => {
          this.addCoursePhoto(
            response["id"],
            response["whereToStore"],
            response["folderName"]
          );
          this.addCourseLectures(response["id"]);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  display() {
    console.log(this.courseScheduleForm);
  }
}

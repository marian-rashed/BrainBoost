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
import { EditCourseDetailsComponent } from "./edit-course-details/edit-course-details.component";
import { EditCourseVideosComponent } from "./edit-course-videos/edit-course-videos.component";
import { EditCourseQuestionsComponent } from "./edit-course-questions/edit-course-questions.component";
import { EditedQuiz } from "./classes/edited-quiz";
import { EditCourseWhatToLearnComponent } from "./edit-course-what-to-learn/edit-course-what-to-learn.component";
import { CourseServiceService } from "../../Services/course/course-service.service";
import { ActivatedRoute } from "@angular/router";
import { CourseService } from "../../Services/course/course.service";
import Swal from "sweetalert2";
import { VidService } from "../../Services/vid.service";
@Component({
  selector: "app-edit-course",
  standalone: true,
  templateUrl: "./edit-course.component.html",
  styleUrl: "./edit-course.component.css",
  imports: [
    EditCourseDetailsComponent,
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    EditCourseVideosComponent,
    EditCourseQuestionsComponent,
    EditCourseWhatToLearnComponent,
  ],
})
export class EditCourseComponent {
  course!: any;
  courseId: number = 0;
  constructor(
    private courseService: CourseServiceService,
    private route: ActivatedRoute,
    private videoService: VidService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.courseId = parseInt(params.get("id")!);
      courseService.getCourseById(this.courseId!.toString()).subscribe({
        next: (response) => {
          this.courseDetailsForm.controls.courseDescription.setValue(
            response["description"]
          );
          this.courseDetailsForm.controls.courseName.setValue(response["name"]);
          this.courseDetailsForm.controls.courseLanguage.setValue(
            response["language"]
          );
          this.courseDetailsForm.controls.courseLevel.setValue(
            response["level"]
          );
          this.courseDetailsForm.controls.price.setValue(response["price"]);
          this.courseDetailsForm.controls.categoryId.setValue(
            response["categoryId"]
          );
          this.courseDetailsForm.controls.photoUrl.setValue(
            response["photoUrl"]
          );
        },
        error: (error) => {
          console.log(error);
        },
      });
    });
  }
  Quiz: EditedQuiz = new EditedQuiz();
  WhatToLearn!: { id: number; name: string }[];
  courseDetailsForm = new FormGroup({
    courseName: new FormControl("", Validators.required),
    courseDescription: new FormControl("", Validators.required),
    price: new FormControl<number | null>(null, Validators.required),
    categoryName: new FormControl("", Validators.required),
    courseLanguage: new FormControl("", Validators.required),
    courseLevel: new FormControl("", Validators.required),
    categoryId: new FormControl(0),
    photoUrl: new FormControl(""),
  });
  courseWhatToLearnForm = new FormArray<FormGroup>([], Validators.minLength(1));
  coursePhoto = new FormControl<File | null>(null, Validators.required);
  courseScheduleForm = new FormArray<FormGroup>([]);
  courseQuestionsForm = new FormArray<FormGroup>([], [Validators.minLength(1)]);
  updateCourseQuiz() {
    this.courseQuestionsForm.controls.forEach((FormGroup, questionsIndex) => {
      this.Quiz.NumOfQuestions++;
      this.Quiz.Degree += FormGroup.controls["degree"].value;
      this.Quiz.Questions.push({
        Id: FormGroup.controls["id"].value,
        HeadLine: FormGroup.controls["headLine"].value,
        Degree: FormGroup.controls["degree"].value,
        Choices: [],
      });
      let answers = FormGroup.controls["answers"] as FormArray<FormGroup>;
      answers.controls.forEach((answer, answerIndex) => {
        let insertedAnswer = {
          Id: answer.controls["id"].value,
          Choice: answer.controls["answer"].value,
          isCorrect: false,
        };
        if (insertedAnswer.Choice == FormGroup.controls["rightAnswer"].value) {
          insertedAnswer.isCorrect = true;
        }
        this.Quiz.Questions[questionsIndex].Choices.push(insertedAnswer);
      });
    });
    this.courseService.UpdateCourseQuizz(this.Quiz, this.courseId).subscribe({
      next: (res) => {
        Swal.fire({
          title: "Done",
          text: "Quizz Updated Successfuly",
          showCancelButton: true,
        });
      },
      error: (err) => {
        Swal.fire({
          title: "Fail",
          text: "Failed to upload the quiz",
          showCancelButton: true,
        });
      },
    });
    this.Quiz = new EditedQuiz();
  }
  updateWhatToLearn() {
    this.WhatToLearn = [];
    this.courseWhatToLearnForm.controls.forEach((point) => {
      this.WhatToLearn.push({
        name: point.controls["content"].value,
        id: point.controls["id"].value,
      });
    });
    this.courseService
      .UpdateCourseWhatToLearn(this.WhatToLearn, this.courseId)
      .subscribe(
        (respone) => {
          Swal.fire({
            title: "Done",
            text: "updated succesfully",
            showCancelButton: true,
          });
        },
        (error) => {
          Swal.fire({
            title: "Fail",
            text: "Failed to upload the what to learn",
            showCancelButton: true,
          });
        }
      );
  }
  updateCourseDetails() {
    this.courseService
      .updateCourseDetails({
        id: this.courseId,
        name: this.courseDetailsForm.controls.courseName.value!,
        description: this.courseDetailsForm.controls.courseDescription.value!,
        price: this.courseDetailsForm.controls.price.value!,
        categoryName: this.courseDetailsForm.controls.categoryName.value!,
        level: this.courseDetailsForm.controls.courseLevel.value!,
        language: this.courseDetailsForm.controls.courseLanguage.value!,
      })
      .subscribe({
        next: (res) => {
          Swal.fire({
            title: "Done",
            text: "Course details updated succesfully",
            showCancelButton: true,
          });
        },
        error: (err) => {
          Swal.fire({
            title: "Fail",
            text: "Failed to update the course details",
            showCancelButton: true,
          });
        },
      });
  }
  editCoursePhoto(courseId: number, typeStore: string, FolderName: string) {
    this.courseService
      .uploadPhoto(this.coursePhoto.value!, courseId, typeStore, FolderName)
      .subscribe({
        next: (response) => {
          Swal.fire({
            title: "Done",
            text: "photo updated successfully",
            showCancelButton: true,
          }).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
              window.location.reload();
            }
          });
        },
        error: (error) => {
          Swal.fire({
            title: "Done",
            text: "failed to upload the photo",
            showCancelButton: true,
          })
        },
      });
  }
  editCourseVideo(video: FormGroup) {
    console.log(video);
    this.videoService
      .updateVideo({
        id: video.controls["id"].value,
        Title: video.controls["title"].value,
        VideoFile: video.controls["video"].value,
        crsId: video.controls["courseId"].value,
        Chapter: video.controls["chapter"].value,
      })
      .subscribe({
        next: (response) => {
          Swal.fire({
            title: "Done",
            text: "video updated successfully",
            showCancelButton: true,
          }).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
              window.location.reload();
            }
          });
        },
        error: (error) => {
          Swal.fire({
            title: "fail",
            text: "failed to update the course",
            showCancelButton: true,
          });
        },
      });
  }
}

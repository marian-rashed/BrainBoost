import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CourseServiceService } from "../../../Services/course/course-service.service";
@Component({
  selector: "app-edit-course-what-to-learn",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./edit-course-what-to-learn.component.html",
  styleUrl: "./edit-course-what-to-learn.component.css",
})
export class EditCourseWhatToLearnComponent implements OnChanges {
  @Input() whatToLearnForm!: FormArray<FormGroup>;
  @Input() courseId: number = 0;
  constructor(private courseService: CourseServiceService) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.courseService.GetWhatToLearnByCourseId(this.courseId!).subscribe({
      next: (response) => {
        response.forEach((w) => {
          this.whatToLearnForm.push(
            new FormGroup(
              {
                id: new FormControl(w["id"]),
                content: new FormControl(w["content"], Validators.required),
              },
              Validators.required
            )
          );
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  addPoint() {
    this.whatToLearnForm.push(
      new FormGroup<any>(
        {
          id: new FormControl(0),
          content: new FormControl("", Validators.required),
        },
        Validators.required
      )
    );
  }
  getControl(index: number): FormControl<any> {
    return this.whatToLearnForm.at(index).controls["content"] as FormControl;
  }
}

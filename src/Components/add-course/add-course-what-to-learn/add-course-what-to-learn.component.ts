import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import {
  FormArray,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-add-course-what-to-learn",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./add-course-what-to-learn.component.html",
  styleUrl: "./add-course-what-to-learn.component.css",
})
export class AddCourseWhatToLearnComponent {
  @Input() whatToLearnForm!: FormArray<FormControl>;
  addPoint() {
    this.whatToLearnForm.push(
      new FormControl<string>("", Validators.required)
    );
  }
}

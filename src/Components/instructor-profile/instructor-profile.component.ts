import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { TeacherService } from "../../Services/teacher/teacher.service";
import { ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-instructor-profile",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./instructor-profile.component.html",
  styleUrl: "./instructor-profile.component.css",
})
export class InstructorProfileComponent implements OnChanges {
  handlePhotoInput($event: any) {
    const file = $event.target.files[0] as File;
    this.aboutTeacherForm.controls.photo.setValue(file);
  }
  userId: string | null = "";
  constructor(
    private teacherService: TeacherService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get("id");
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.aboutTeacherForm.controls.aboutYou.setValue(this.teacher["aboutYou"]);
    this.aboutTeacherForm.controls.jobTitles.setValue(this.teacher["career"]);
    this.aboutTeacherForm.controls.yearsOfExperience.setValue(
      this.teacher["yearsOfExperience"]
    );
    this.aboutTeacherForm.controls.phone.setValue(this.teacher["phoneNumber"]);
    this.aboutTeacherForm.controls.address.setValue(this.teacher["address"]);
  }

  @Input() teacher!: any;
  aboutTeacherForm = new FormGroup({
    jobTitles: new FormControl("", Validators.required),
    aboutYou: new FormControl("", Validators.required),
    photo: new FormControl<File | null>(null),
    phone: new FormControl("", Validators.required),
    address: new FormControl("", Validators.required),
    yearsOfExperience: new FormControl<number | null>(
      null,
      Validators.required
    ),
  });
  submit() {
    console.log(this.aboutTeacherForm);
    if (this.aboutTeacherForm.invalid) {
      this.errorsExistedinsubmit = !this.errorsExistedinsubmit;
    } else {
      this.teacherService
        .updateTeacher({
          jobTitles: this.aboutTeacherForm.controls.jobTitles.value!,
          aboutYou: this.aboutTeacherForm.controls.aboutYou.value!,
          photo: this.aboutTeacherForm.controls.photo.value!,
          yearsOfExperience:
            this.aboutTeacherForm.controls.yearsOfExperience.value!,
          phoneNumber: this.aboutTeacherForm.controls.phone.value!,
          address: this.aboutTeacherForm.controls.address.value!,
          userId: this.userId,
        })
        .subscribe({
          next: (response) => {
            Swal.fire({
              title: "Done",
              text: "Course details updated successfully",
              showCancelButton: true,
            }).then((result) => {
              if (result.isConfirmed || result.isDismissed) {
                window.location.reload();
              }
            });
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }
  errorsExistedinsubmit: boolean = false;
}

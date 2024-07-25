import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { InputAngularMaterialComponent } from "../../Inputs/input-angular-material/input-angular-material.component";
import { AutoSelectAngularMaterialComponent } from "../../Inputs/auto-select-angular-material/auto-select-angular-material.component";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../Enviroment/enviroment";
import { FormGroup } from "@angular/forms";
import { Options } from "../../../classes/options";
import Swal from "sweetalert2";

@Component({
  selector: "app-edit-course-details",
  standalone: true,
  imports: [InputAngularMaterialComponent, AutoSelectAngularMaterialComponent],
  templateUrl: "./edit-course-details.component.html",
  styleUrl: "./edit-course-details.component.css",
})
export class EditCourseDetailsComponent implements OnChanges{
  @Input() courseDetailsForm!: FormGroup;
  languageOptions = Options.languages;
  levelOptions = Options.level;
  categoryOptions: string[] = [];
  constructor(private http: HttpClient) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.http
      .get<{ id: number; name: string }[]>(
        `${environment.baseUrl}/api/Category/GetAllCategories`
      )
      .subscribe({
        next: (response) => {
          response.forEach((value) => {
            this.categoryOptions.push(value.name);
            if(value['id']==this.courseDetailsForm.controls["categoryId"].value){
              this.courseDetailsForm.controls["categoryName"].setValue(value.name);
            }
          });
        },
        error: (error) => {
          Swal.fire({
            title: 'Fail',
            text: 'Failed to Get the categories',
            showCancelButton: true,
          });
          },
      });
  }
  handleImageInput(img: any) {
    const file = img.target.files[0] as File;
    this.courseDetailsForm.controls["courseImage"].setValue(file);
  }
}

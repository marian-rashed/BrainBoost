import { Component, Input } from '@angular/core';
import { InputAngularMaterialComponent } from '../../Inputs/input-angular-material/input-angular-material.component';
import { AutoSelectAngularMaterialComponent } from '../../Inputs/auto-select-angular-material/auto-select-angular-material.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../Enviroment/enviroment';
import { FormGroup } from '@angular/forms';
import { Options } from '../../../classes/options';

@Component({
  selector: 'app-add-course-details',
  standalone: true,
  imports: [InputAngularMaterialComponent, AutoSelectAngularMaterialComponent],
  templateUrl: './add-course-details.component.html',
  styleUrl: './add-course-details.component.css',
})
export class AddCourseDetailsComponent {
  @Input() courseDetailsForm !:FormGroup;
  languageOptions=Options.languages
  levelOptions=Options.level
  categoryOptions:string[] =[]
  constructor(http: HttpClient) {
    
    http
      .get<{id:number,name:string}[]>(
        `${environment.baseUrl}/api/Category/GetAllCategories`
      )
      .subscribe({
        next: (response) => {
          response.forEach((value)=>{
            this.categoryOptions.push(value.name)
          })
        },
        error: (error) => {
          console.log(error)
        },
      });
      console.log(this.categoryOptions)
  }
  handleImageInput(img: any) {
    const file = img.target.files[0] as File;
    this.courseDetailsForm.controls['courseImage'].setValue(file)
    console.log(this.courseDetailsForm.controls['courseImage'])
  }
}

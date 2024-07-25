import { Component, OnInit } from '@angular/core';
import { IstudentDetails } from '../../models/istudent-details';
import { StudentService } from '../../Services/student/student.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about-student',
  standalone: true,
  imports: [],
  templateUrl: './about-student.component.html',
  styleUrl: './about-student.component.css'
})
export class AboutStudentComponent implements OnInit {
  studentData: IstudentDetails | undefined;
  constructor(private studentservice: StudentService,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const studentId = Number(params.get('id'));
      if (studentId) {
        this.GetStudentData(studentId);
      }
    });
  }
  GetStudentData(studentId: number) {
    this.studentservice.GetStudentData(studentId).subscribe(
      (data: IstudentDetails) => {
        this.studentData = data;
        console.log(this.studentData);
      },
      (error) => {
        console.error('Error fetching data of Student', error);
      }
    );
  }


}

import { Component, OnInit } from '@angular/core';
import { AdminDashboardServiceService } from '../../Services/AdminDashboard/admin-dashboard-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IcourseEarning } from '../../models/icourse-earning';

@Component({
  selector: 'app-teacher-earning-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teacher-earning-details.component.html',
  styleUrl: './teacher-earning-details.component.css'
})
export class TeacherEarningDetailsComponent implements OnInit{
  constructor(
    private admindashboardservice: AdminDashboardServiceService,
    private router: Router,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) {}


  ngOnInit(): void {
    // Access the id parameter from the route
    this.route.paramMap.subscribe(params => {
      const InsId = Number(params.get('id')); // Get the id from the URL
      if (InsId) {
        this.GetCoursesAndEarningsForInstructor(InsId);
      }
    });
  }
  CoursesAndEarningsForInstructor!:IcourseEarning[]
  
  GetCoursesAndEarningsForInstructor(InsId:number)
  {
    this.admindashboardservice.GetCoursesAndEarningsForInstructor(InsId).subscribe(
      (data: IcourseEarning[]) => {
        this.CoursesAndEarningsForInstructor = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

}

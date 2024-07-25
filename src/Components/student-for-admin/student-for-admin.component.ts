import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IStudent } from '../../models/istudent';
import { AdminDashboardServiceService } from '../../Services/AdminDashboard/admin-dashboard-service.service';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-student-for-admin',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './student-for-admin.component.html',
  styleUrls: ['./student-for-admin.component.css']
})
export class StudentForAdminComponent implements OnInit {
  ListOfStudents: IStudent[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;

  constructor(private admindashboardservice: AdminDashboardServiceService, private router: Router) {}

  ngOnInit(): void {
    this.GetAllStudents();
  }

  GetAllStudents() {
    this.admindashboardservice.GetAllStudents().subscribe(
      (data: IStudent[]) => {
        console.log(data);
        this.ListOfStudents = data;
      },
      (error) => {
        console.error('Error fetching Students', error);
      }
    );
  }

  GoToStudentDetails(id: number) {
    this.router.navigate(['/StudentDetails2', id]);
  }

  DeleteStudent(id: number) {
    this.admindashboardservice.DeleteStudent(id).subscribe(
      () => {
        this.GetAllStudents();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}

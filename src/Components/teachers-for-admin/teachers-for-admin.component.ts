import { Component, OnInit } from '@angular/core';
import { ITeacher } from '../../models/iteacher';
import { Router } from '@angular/router';
import { AdminDashboardServiceService } from '../../Services/AdminDashboard/admin-dashboard-service.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-teachers-for-admin',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './teachers-for-admin.component.html',
  styleUrls: ['./teachers-for-admin.component.css']
})
export class TeachersForAdminComponent implements OnInit {
  ListOfTeachers: ITeacher[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;

  constructor(
    private router: Router,
    private admindashboardservice: AdminDashboardServiceService
  ) {}

  ngOnInit(): void {
    this.GetAllTeachers();
  }

  GetAllTeachers() {
    this.admindashboardservice.GetAllTeachers().subscribe(
      (data: ITeacher[]) => {
        this.ListOfTeachers = data;
      },
      (error) => {
        console.error('Error fetching Teachers', error);
      }
    );
  }

  GoToTeacherDetails(id: number) {
    this.router.navigate(['/TeacherDetails2/', id]);
  }

  DeleteTeacher(TeacherId: number) {
    this.admindashboardservice.DeleteTeacher(TeacherId).subscribe(
      () => {
        this.GetAllTeachers();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}

import { Component, OnInit, HostListener } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AboutTeacherComponent } from "../../app/about-teacher/about-teacher.component";
import { TeacherCoursesComponent } from "../../app/teacher-courses/teacher-courses.component";
import { TeacherEarningComponent } from "../../app/teacher-earning/teacher-earning.component";
import { TeacherService } from "../../Services/teacher/teacher.service";
import { InstructorProfileComponent } from "../instructor-profile/instructor-profile.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-teacher-details",
  standalone: true,
  templateUrl: "./teacher-details.component.html",
  styleUrl: "./teacher-details.component.css",
  imports: [
    AboutTeacherComponent,
    TeacherCoursesComponent,
    TeacherEarningComponent,
    CommonModule,
    InstructorProfileComponent,
  ],
})
export class TeacherDetailsComponent {
  teacher!: any;
  teacherCourses!: any[];
  teacherId!: number;
  constructor(
    private teacherService: TeacherService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.teacherId = params["id"];
      this.teacherService.getTeacher(this.teacherId).subscribe({
        next: (data) => {
          this.teacher = data;
        },
        error: (err) => console.log(err),
      });
    });
    this.teacherService.GetCoursesCardsForTeacher(this.teacherId).subscribe({
      next: (data) => {
        this.teacherCourses = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  isSidebarCollapsed = false;
  isSidebarHidden = false; // Sidebar hidden by default on small screens
  currentComponent = "about-teacher";

  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    if (event.target.innerWidth > 992) {
      this.isSidebarHidden = false;
    }
  }

  toggleSidebar() {
    if (window.innerWidth <= 992) {
      this.isSidebarHidden = !this.isSidebarHidden;
    } else {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
  }

  showComponent(component: string) {
    this.currentComponent = component;
  }
}

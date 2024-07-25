import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-teacher-courses',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './teacher-courses.component.html',
  styleUrl: './teacher-courses.component.css',
})
export class TeacherCoursesComponent {
  @Input() teacherCourses!: any[];
  constructor(public router:Router) {}
}

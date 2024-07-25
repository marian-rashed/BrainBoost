import { Component, Input } from '@angular/core';
import { CourseService } from '../../Services/course/course.service';
import { ICourseCardDetails } from '../../models/icourse-card-details';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-courses.component.html',
  styleUrl: './student-courses.component.css',
})
export class StudentCoursesComponent {
  @Input() studentId: any;
  public stdCourses!: ICourseCardDetails[];
  constructor(private courseService: CourseService, private router:Router) {}
  ngOnInit(): void {
    this.GetStudentCourses();
  }
  GetStudentCourses() {
    this.courseService.GetStudentCourses(this.studentId).subscribe(
      (data: ICourseCardDetails[]) => {
        this.stdCourses = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching  Student Courses', error);
      }
    );
  }
  handleGoToCourse(id: number): void {
    this.router.navigate(['/TakingCourse', id]);
  }
}

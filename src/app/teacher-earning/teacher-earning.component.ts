import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TeacherService } from '../../Services/teacher/teacher.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-earning',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teacher-earning.component.html',
  styleUrl: './teacher-earning.component.css',
})
export class TeacherEarningComponent implements OnChanges {
  teacherCourses!: any[];
  @Input() teacherId!: number;
  constructor(private teacherService: TeacherService) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.teacherService
      .GetTeacherEarnings(this.teacherId)
      .subscribe({
        next: (data) => {
          this.teacherCourses = data;
          console.log(data)
        }
      });
  }
}

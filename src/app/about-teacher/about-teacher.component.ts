import { Component, Input } from '@angular/core';
import { TeacherService } from '../../Services/teacher/teacher.service';

@Component({
  selector: 'app-about-teacher',
  standalone: true,
  imports: [],
  templateUrl: './about-teacher.component.html',
  styleUrl: './about-teacher.component.css',
})
export class AboutTeacherComponent {
  @Input() teacherInfo!: any;
  constructor(private teacherService: TeacherService) {
  }
}

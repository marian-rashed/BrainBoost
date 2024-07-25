import { Component } from '@angular/core';
import { EnrollmentService } from '../../../Services/enrollment/enrollment.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-enrollment-success',
  standalone: true,
  imports: [],
  templateUrl: './enrollment-success.component.html',
  styleUrl: './enrollment-success.component.css',
})
export class EnrollmentSuccessComponent {
  orderNumber!: string | null;
  courseId!: number | null;
  constructor(
    private route: ActivatedRoute,
    private enrollmentService: EnrollmentService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.orderNumber = params.get('orderNumber');
    });
    this.route.paramMap.subscribe((params) => {
      this.courseId = Number(params.get('courseId'));
    });
    this.enrollmentService.CheckStatus(this.orderNumber).subscribe((order) => {
      this.router.navigate(['/TakingCourse', this.courseId]);
    });
  }
}

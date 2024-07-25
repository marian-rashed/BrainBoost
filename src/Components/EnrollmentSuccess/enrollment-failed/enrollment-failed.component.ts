import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnrollmentService } from '../../../Services/enrollment/enrollment.service';

@Component({
  selector: 'app-enrollment-failed',
  standalone: true,
  imports: [],
  templateUrl: './enrollment-failed.component.html',
  styleUrl: './enrollment-failed.component.css'
})
export class EnrollmentFailedComponent  {
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
      this.router.navigate(['/courseDetails', this.courseId]);
    });
  }
}

import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourseDetails } from '../../models/icourse-details';
import { environment } from '../../Enviroment/enviroment';
import { CourseService } from '../../Services/course/course.service';
import { DataService } from '../../Services/sharedData/data.service';
import { AuthService } from '../../Services/auth.service';
import { EnrollmentService } from '../../Services/enrollment/enrollment.service';
import { IEnrollment } from '../../models/ienrollment';
import { IPaymentUrl } from '../../models/ipayment-url';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner/spinner.component';

@Component({
  selector: 'app-course-details',
  standalone: true,
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css',
  imports: [CommonModule, SpinnerComponent],
})
export class CourseDetailsComponent {
  courseId!: number;
  currentUserId!: number;
  crsDetails!: ICourseDetails;
  enrollmentData!: IEnrollment;
  paymentUrl!: IPaymentUrl;
  Role!: string;
  UserIsLogged!: boolean;
  IsEnrolled: boolean = false;
  NumOfStudent: number;
  stars: boolean[] = [];
  env: string = environment.baseUrl + '/Images/Courses/';
  isLoading: boolean = false;
  review: any;
  private beforeUnloadListener!: EventListenerOrEventListenerObject;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private authService: AuthService,
    private enrollmentService: EnrollmentService,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.courseId = +params['id'];
    });
    this.NumOfStudent = 0;
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('beforeunload', this.handleUnload);
    }
    this.authService.userData.subscribe({
      next: () => {
        if (this.authService.userData.value != null) {
          this.Role =
            this.authService.userData.value[
              'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
            ];
          this.UserIsLogged = true;
          this.currentUserId =
            this.authService.userData.value[
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
            ];
        } else {
          this.UserIsLogged = false;
          this.Role = '';
        }
      },
      error: () => {},
    });
    this.courseService.getCourseDetails(this.courseId).subscribe({
      next: (data: ICourseDetails) => {
        this.crsDetails = data;
        if (this.crsDetails && this.crsDetails.review) {
          this.review = this.crsDetails.review.map((review) => ({
            ...review,
            stars2: Array(5)
              .fill(false)
              .map((_, index) => index < (review.rate ?? 0)),
          }));
          console.log(this.crsDetails);
          console.log(this.review);
        }
      },
      error: (error) => {
        console.error('Error fetching courses:', error); // Log any errors
      },
      complete: () => {
        console.log('courses fetched successfully'); // Log completion
        this.stars = Array(5)
          .fill(false)
          .map((_, index) => index < (this.crsDetails.rate ?? 0));
      },
    });
    this.enrollmentService
      .CheckEnroll(this.courseId, this.currentUserId)
      .subscribe((data) => (this.IsEnrolled = data));
    this.courseService.getCourseNumOfStds(this.courseId).subscribe({
      next: (data: number) => {
        this.NumOfStudent = data;
      },
      error: (error) => {
        console.error(
          'Error fetching Number Of Student To This Course:',
          error
        );
      },
      complete: () => {
        console.log('Number Of Students To This Course fetched successfully');
      },
    });
  }
  handleEnrollCourse(courseId: number) {
    const currentUrl = this.router.url;
    this.isLoading = true;
    if (this.UserIsLogged) {
      this.enrollmentData = {
        studentId: 1,
        courseId: courseId,
        isActive: false,
      };
      this.enrollmentService
        .Enroll(this.enrollmentData)
        .subscribe((data: IPaymentUrl) => {
          setTimeout(() => {
            this.isLoading = false;
            window.location.href = data.url;
          }, 3000);
        });
    } else {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: currentUrl },
      });
    }
  }
  handleGoToCourse(id: number): void {
    this.router.navigate(['/TakingCourse', id]);
  }
  private handleUnload = (event: Event) => {
    this.isLoading = false;
  };
  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('beforeunload', this.beforeUnloadListener);
    }
  }
}

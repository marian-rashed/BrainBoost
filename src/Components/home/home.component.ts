import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ICourseCardDetails } from '../../models/icourse-card-details';
import { CourseService } from '../../Services/course/course.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  loading: boolean = false;
  ListOfCourses: ICourseCardDetails[] = [];
  priceString: String = '';
  stars: boolean[] = [];
  constructor(private courseservice: CourseService, private router: Router) {}
  ngOnInit(): void {
    this.GetTop4Courses();
  }
  GetTop4Courses() {
    this.courseservice.getTop4Crs().subscribe({
      next: (courses) => {
        this.ListOfCourses = courses.map((course) => ({
          ...course,
          stars: Array(5)
            .fill(false)
            .map((_, index) => index < (course.rate ?? 0)),
        }));
      },
      error: (error) => {
        console.error('Error fetching courses', error);
      },
      complete: () => {
        console.log('Courses fetched successfully');
      },
    });
  }

  checkPrice(price: any) {
    if (price > 0) {
      this.priceString = '$' + price.toString();
    } else {
      this.priceString = 'Free';
    }
  }
  GoToCourseDetails(id: number) {
    this.router.navigate(['/courseDetails', id]);
  }
  loadMore() {
    // Simulate an API call or any asynchronous operation
    this.loading = true;
    setTimeout(() => {
      // Here you would fetch more data or perform some action
      this.loading = false;
      this.router.navigate(['/courses']);
    }, 2000); // Simulating a delay of 2 seconds
  }
}

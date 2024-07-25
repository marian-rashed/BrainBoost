import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CourseService } from '../../../Services/course/course.service';
import { IQuiz } from '../../../models/iquiz';
import { QuizService } from '../../../Services/quiz.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ICourseTaking } from '../../../models/someCourseTakingModels/icourse-taking';
import { IReviewService } from '../../../Services/ireview.service';
import { IReview } from '../../../models/ireview';

import { EnrollmentService } from '../../../Services/enrollment/enrollment.service';
import { environment } from '../../../Enviroment/enviroment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-content',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink,RouterOutlet],
  templateUrl: './course-content.component.html',
  styleUrl: './course-content.component.css',
})
export class CourseContentComponent implements OnInit  {
  CrsId!:number
  Course!:ICourseTaking
  msg:string=''
  rating: number = 0;
  stars: boolean[] = Array(5).fill(false);
  StdReview!:IReview
  env: string = environment.baseUrl

  constructor(
    private courseService: CourseService,
    private QuizService: QuizService,
    private router: Router,
    private route: ActivatedRoute,
    private revService:IReviewService,
    private enrollmentService: EnrollmentService,
    private toastr: ToastrService
  ) {
    this.route.params.subscribe(params => {
      this.CrsId = +params['id']; // Convert to number (if needed)
      console.log(this.CrsId)
    });
  }

  ngOnInit(): void {
    this.getTakenCourse(this.CrsId)
    this.handleExamSuccess();
    this.StdReview={
      id:0,
      courseId: this.CrsId,
      rate:0,
      content: ''

    }

  }
  navigateToVideos(CrsId:number){
    this.router.navigate(['/TakingVideo', CrsId]);
  }
  navigateToQuiz(CrsId:number){
    this.router.navigate(['/TakingQuiz', CrsId]);
  }
  navigateToCertificate(CrsId:number){
    this.router.navigate(['/TakingCertificate', CrsId]);
  }
  handleExamSuccess() {
    if (this.QuizService.stdDegree > -1) {
      if (this.QuizService.stdState == 'succeeded')
        this.msg = `you have successfully finish quiz go take your certificate`;
      else
      {
       this.msg = `you have failed in the quiz please try again`;
       }
      this.toastr.warning(this.msg);
    }

    this.QuizService.stdDegree=-1

}
getTakenCourse(id:number)
{
  this.courseService.getTakingCourse(id).subscribe({
    next: (data: ICourseTaking) => {
      this.Course = data;

    console.log(  this.Course)
    console.log(this.Course.states?.hasFinishedallVideos)
    },
    error: (error) => {
      console.error('Error fetching courses:', error);
    },
    complete: () => {
      console.log('courses fetched successfully');
    },
  })
}
review(rev:any)
{
  debugger
  console.log( rev.target.value)
  this.StdReview.content = rev.target.value
  this.revService.changeReview(this.StdReview).subscribe({})
}
rate(rating: number): void {
  this.rating = rating;
  this.stars = this.stars.map((_, i) => i < rating);
  this.StdReview.rate = rating
  this.revService.changeRate(this.StdReview).subscribe({})

}
navigatetoteacher()
{
   this.router.navigate(['/TakingVideo', this.CrsId]);
}
}

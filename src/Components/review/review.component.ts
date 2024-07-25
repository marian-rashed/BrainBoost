import { Component, OnInit } from '@angular/core';
import { IReviewService } from '../../Services/ireview.service';
import { Router } from 'express';
import { ActivatedRoute } from '@angular/router';
import { IReviewSomeDetails } from '../../models/ireview-some-details';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit  {
  TeacheId!:number
  reviews:any;
  // stars:boolean[]=[]
  constructor(private revService:IReviewService, private router: Router,
    private route: ActivatedRoute,){
    this.route.params.subscribe(params => {
      this.TeacheId = +params['id']; // Convert to number (if needed)
      console.log(this.TeacheId)
    });
  }
  ngOnInit(): void {
    this.revService.getReview(this.TeacheId).subscribe({
      next: (data: IReviewSomeDetails[]) => {
        this.reviews = data.map(review => ({
          ...review,
          stars: Array(5).fill(false).map((_, index) => index < (review.rate ?? 0))
        }));

        console.log(this.reviews);
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
      },
      complete: () => {
        console.log('courses fetched successfully');

      },
    })
  }


}

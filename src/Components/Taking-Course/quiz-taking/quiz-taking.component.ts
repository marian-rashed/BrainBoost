import { Component, OnInit, Output } from '@angular/core';
import { IQuiz } from '../../../models/iquiz';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CourseService } from '../../../Services/course/course.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ICheckAnswer } from '../../../models/icheck-answer';
import { IQuestionAndAnswerIDs } from '../../../models/iquestion-and-answer-ids';
import { QuizService } from '../../../Services/quiz.service';


@Component({
  selector: 'app-quiz-taking',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './quiz-taking.component.html',
  styleUrl: './quiz-taking.component.css'
})
export class QuizTakingComponent implements OnInit  {
  CourseId!:number
  Quiz!:IQuiz
  QuizCheckAnswer!:ICheckAnswer
  QuestionAndAnswer!:IQuestionAndAnswerIDs
   stdDegree :number=0;
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private quizService: QuizService,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      this.CourseId = +params['id']; // Convert to number (if needed)
      console.log(this.CourseId)
    });
  }
  ngOnInit(): void {


    this.GetQuiz(this.CourseId)
  }
  GetQuiz(crsId:number)
  {
    this.courseService.GetTakingQuiz(crsId).subscribe({

      next: (data: IQuiz) => {
        this.Quiz = data;
        this.QuizCheckAnswer={
          CourseId:1,
          QuizId:this.Quiz.id,
          QuestionAndAnswernId:[],
        }
        this.QuestionAndAnswer={
          QuestionId:0,
          AnswerId:0
        }
      console.log(  this.Quiz)
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
      },
      complete: () => {
        console.log('courses fetched successfully');
      },
    });
  }
  handleCorrectAnswer(AnswerId: number, QuestionId: number): void {

    const existingEntry = this.QuizCheckAnswer.QuestionAndAnswernId.find(entry => entry.QuestionId === QuestionId);

    if (existingEntry) {
      existingEntry.AnswerId = AnswerId;
    } else {
      this.QuizCheckAnswer.QuestionAndAnswernId.push({ QuestionId, AnswerId });
    }

    console.log(this.QuizCheckAnswer);
  }
changeState(id: number,status:boolean)
{
  this.quizService.changeQuizState(id,status).subscribe({

  })
}
  handleSuccess()
  {
    debugger
     this.stdDegree=0
   this.Quiz.question.forEach(qs => {
           this.QuizCheckAnswer.QuestionAndAnswernId.forEach(qan=>{
            if(qs.id == qan.QuestionId &&qs.answers!=null)
              {
                if(qs.answers.find(answ => answ.id === qan.AnswerId)?.isCorrect===true)
                  {
                    this.stdDegree+= qs.degree //1
                  }
              }

           })
   });
   this.quizService.stdDegree=this.stdDegree
 if(this.stdDegree>=this.Quiz.minDegree )
  {
      this.quizService.stdState="succeeded"
      if( !this.Quiz.quizState)
        {
          this.Quiz.quizState=true
      this.quizService.changeQuizState(this.CourseId,this.Quiz.quizState).subscribe({
        next: (data: any) => {
          this.router.navigate(['/TakingCertificate',this.CourseId]);
        },
      })
    }
    else
    {
      this.router.navigate(['/TakingCertificate',this.CourseId]);
    }
  }
  else {
      this.quizService.stdState="Failed"
      this.router.navigate(['/TakingCourse',this.CourseId]);
  }
  console.log(this.quizService.stdState,this.quizService.stdDegree)
  }
}

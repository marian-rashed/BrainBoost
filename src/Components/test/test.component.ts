import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { IQuiz } from '../../models/iquiz';
import { ICheckAnswer } from '../../models/icheck-answer';
import { IQuestionAndAnswerIDs } from '../../models/iquestion-and-answer-ids';
import { CourseService } from '../../Services/course/course.service';
import { QuizService } from '../../Services/quiz.service';
interface Video {
  title: string;
  src: string;
  watched: boolean;
}
@Component({
  selector: 'app-test',
  standalone: true,
  imports: [RouterLink,RouterOutlet,FormsModule,CommonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  CourseId:number=2
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
    // this.route.params.subscribe(params => {
    //   this.CourseId = +params['id']; // Convert to number (if needed)
    //   console.log(this.CourseId)
    // });
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
 if(this.stdDegree>=this.Quiz.minDegree)
  {
      this.quizService.stdState="succeeded"
      this.Quiz.quizState=true
      this.quizService.changeQuizState(2,this.Quiz.quizState).subscribe({
        next: (data: any) => {
          this.router.navigate(['/TakingCertificate']);
        },
      })
  }
  else{
      this.quizService.stdState="Failed"
      this.router.navigate(['/TakingCourse']);
  }
  console.log(this.quizService.stdState,this.quizService.stdDegree)
  }}

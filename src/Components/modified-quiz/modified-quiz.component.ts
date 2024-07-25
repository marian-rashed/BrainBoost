import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../Services/course/course.service';
import { QuizService } from '../../Services/quiz.service';
import { IQuiz } from '../../models/iquiz';
import { ICheckAnswer } from '../../models/icheck-answer';
import { IQuestionAndAnswerIDs } from '../../models/iquestion-and-answer-ids';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IQuestion } from '../../models/iquestion';

@Component({
  selector: 'app-modified-quiz',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './modified-quiz.component.html',
  styleUrl: './modified-quiz.component.css'
})
export class ModifiedQuizComponent {
  CourseId!:number
  Quiz!:IQuiz
  quest!:IQuestion
  QuizCheckAnswer!:ICheckAnswer
  QuestionAndAnswer!:IQuestionAndAnswerIDs
   stdDegree :number=0;
   currentQuestionIndex: number = 0;
   timeLeft: number = 600; // Total time in seconds
   timer: any;
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
    this.startTimer();
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

     this.stdDegree=0
   this.Quiz.question.forEach(qs => {
    console.log(qs)
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
   console.log(this.stdDegree)
   this.quizService.stdDegree=this.stdDegree
   this.clearTimer();
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

   GetcurrentQuestion(){
    return this.Quiz?.question[this.currentQuestionIndex];

  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.Quiz.question.length - 1) {
      this.currentQuestionIndex++;
      this.GetcurrentQuestion()
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }
  ngOnDestroy(): void {
    this.clearTimer();
  }

  startTimer(): void {
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.handleSuccess(); // Handle quiz completion when time runs out
      }
    }, 1000);
  }

  clearTimer(): void {
    clearInterval(this.timer);
  }
  formatTimeLeft(): string {
    const minutes: number = Math.floor(this.timeLeft / 60);
    const seconds: number = this.timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  handlecheck(answerid:number, QuestionId: number,index:number)
  {
    const existingEntry = this.QuizCheckAnswer.QuestionAndAnswernId.find(entry => entry.QuestionId === QuestionId);

    if(existingEntry)
     {
      if(existingEntry.AnswerId==answerid)
        return true
      else
      return false
     }
     return false 

  }
}

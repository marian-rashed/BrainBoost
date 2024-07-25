import { Component, OnInit } from '@angular/core'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { CourseService } from '../../../Services/course/course.service'
import { ICertificate } from '../../../models/icertificate'
import { ActivatedRoute } from '@angular/router'
import { QuizService } from '../../../Services/quiz.service'
import { ToastrService } from 'ngx-toastr'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'


@Component({
  selector: 'app-certificate',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './certificate.component.html',
  styleUrl: './certificate.component.css'
})
export class CertificateComponent implements OnInit{
  CourseId!:number
Certificate!:ICertificate
msg:string=''
  constructor (private crsService:CourseService,
    private route:ActivatedRoute,
    private QuizService: QuizService,
    private toastr: ToastrService){
    this.route.params.subscribe(params => {
      this.CourseId = +params['id']; // Convert to number (if needed)
      console.log(this.CourseId)
    });
  }
  ngOnInit(): void {
   this.getCert(this.CourseId)
   this.handleExamSuccess();
  }

  getCert(id:number)
  {
    this.crsService.getCertificate(id).subscribe({

      next: (data: ICertificate) => {
        this.Certificate = data;
       console.log(this.Certificate)
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
      },
      complete: () => {
        console.log('courses fetched successfully');
      },
    });
  }
  generatePDF()
  {
    const elementToPrint:any = document.getElementById('download')
  html2canvas(elementToPrint,{scale:2}).then((canvas) =>{
   const pdf=new jsPDF();
   pdf.addImage(canvas.toDataURL('image/png'),'PNG',0,0,211,218);
   pdf.save('BrainBoost.pdf');
  })
  }
  handleExamSuccess() {
    if (this.QuizService.stdDegree > -1) {
      if (this.QuizService.stdState == 'succeeded')
        this.msg = `you have successfully finish quiz take your certificate`;
      else this.msg = `you have failed in the quiz please try again`;
      this.toastr.success(this.msg);
    }
    this.QuizService.stdDegree=-1

}
}

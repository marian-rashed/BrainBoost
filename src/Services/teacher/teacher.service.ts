import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../Enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(private http: HttpClient) {}
  updateTeacher(insertedTeacher: {
    jobTitles: string;
    aboutYou: string;
    photo: File;
    yearsOfExperience: number;
    userId:string|null;
    phoneNumber:string;
    address: string,
  }): Observable<any> {
    const insertedTeacherForm = new FormData();
    insertedTeacherForm.append("Career",insertedTeacher.jobTitles)
    insertedTeacherForm.append("AboutYou",insertedTeacher.aboutYou)
    insertedTeacherForm.append("Photo",insertedTeacher.photo)
    insertedTeacherForm.append("YearsOfExperience",insertedTeacher.yearsOfExperience.toString())
    insertedTeacherForm.append("UserId",insertedTeacher.userId!)
    insertedTeacherForm.append("PhoneNumber",insertedTeacher.phoneNumber)
    insertedTeacherForm.append("Address",insertedTeacher.address)
    return this.http.put(
      `${environment.baseUrl}/api/Teacher/UpdateTeacherData`,
      insertedTeacherForm
    );
  }
  getTeacher(teacherId:number): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/Teacher/GetTeacherById/${teacherId}`)
  }
  GetCoursesCardsForTeacher(teacherId:number): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/Teacher/GetCoursesCardsForTeacher?TeacherId=${teacherId}`)
  }
  GetTeacherEarnings(teacherId:number): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/Earning/GetCoursesAndEarningsForInstructor/${teacherId}`) 
  }
}

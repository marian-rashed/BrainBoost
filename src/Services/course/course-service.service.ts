import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../Enviroment/enviroment';
import { InsertedQuiz } from '../../Components/add-course/classes/inserted-quiz';

@Injectable({
  providedIn: 'root',
})
export class CourseServiceService {
  constructor(private http: HttpClient) {}
  addVideo(formdata: FormData, courseId: Number): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}/api/Course/AddVideo/${courseId}`,
      formdata
    );
  }
  uploadPhoto(photo: File, courseId: Number,WhereToStore:string,FolderName:string): Observable<any> {
    const insertedCoursePhotoForm = new FormData();
    insertedCoursePhotoForm.append('Photo', photo);
    insertedCoursePhotoForm.append('WhereToStore', WhereToStore);
    insertedCoursePhotoForm.append('folderName', FolderName);
    return this.http.post(
      `${environment.baseUrl}/api/Course/HandlePhoto/${courseId}`,
      insertedCoursePhotoForm
    );
  }
  addCourse(insertedCourse: {
    Name: string;
    Description: string;
    Price: number;
    TeacherId: number;
    CategoryName: string;
    CertificateHeadline: string;
    Level: string;
    CertificateAppreciationParagraph: string;
    Language: string;
    Quiz: InsertedQuiz;
    WhatToLearn: string[];
    CoursePhoto:FormDataEntryValue|null
  }): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}/api/Course/AddCourse`,
      insertedCourse,
    );
  }
  getCourseById(courseId: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/Course/GetCourseById/${courseId}`)
  }
  GetWhatToLearnByCourseId(courseId: number): Observable<any[]> {
    return this.http.get<any>(`${environment.baseUrl}/api/Course/GetWhatToLearnByCourseId/${courseId}`)
  }
  updateCourseDetails(editedCourse: {
    id:number;
    price: number;
    name: string;
    description: string;
    categoryName: string;
    level: string;
    language: string;
  }): Observable<any> {
    console.log(editedCourse)
    return this.http.put(
      `${environment.baseUrl}/api/Course/UpdateCourseDetails/${editedCourse.id}`,
      editedCourse,
    );
  }
  UpdateCourseWhatToLearn(editedWhatToLearn: {
    id:number;
    name: string;
  }[],courseId:number): Observable<any> {
    console.log(editedWhatToLearn)
    return this.http.put(
      `${environment.baseUrl}/api/Course/UpdateCourseWhatToLearn/${courseId}`,
      editedWhatToLearn,
    );
  }
  UpdateCourseQuizz(editedQuizz: any,courseId:number): Observable<any> {
    console.log(editedQuizz)
    return this.http.put(
      `${environment.baseUrl}/api/Quiz/UpdateCourseQuiz/${courseId}`,
      editedQuizz,
    );
  }
}

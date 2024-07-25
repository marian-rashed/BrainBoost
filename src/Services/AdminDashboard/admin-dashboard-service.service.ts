import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Init } from 'v8';
import { environment } from '../../Enviroment/enviroment';
import { Observable } from 'rxjs';
import { ITopTeacher } from '../../models/itop-teacher';
import { ICurrentCourses } from '../../models/icurrent-courses';
import { ITopStudent } from '../../models/itop-student';
import { IcourseNotApproved } from '../../models/icourse-not-approved';
import { ICourseCardDetails } from '../../models/icourse-card-details';
import { ITeacher } from '../../models/iteacher';
import { IStudent } from '../../models/istudent';
import { ITeacherEarning } from '../../models/iteacher-earning';
import { IcourseEarning } from '../../models/icourse-earning';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardServiceService {

  constructor(private httpclient:HttpClient) { }

  GetNumOfStudent(): Observable<Number> {
    return this.httpclient.get<Number>(
      `${environment.baseUrl}/api/Student/GetTotalNumOfStudent`
    );
  }

  GetNumOfCourse(): Observable<Number> {
    return this.httpclient.get<Number>(
      `${environment.baseUrl}/api/Course/GetTotalNumOfCourse`
    );
  }

  GetNumOfTeacher(): Observable<Number> {
    return this.httpclient.get<Number>(
      `${environment.baseUrl}/api/Teacher/GetTotalNumOfTeachers`
    );
  }

  GetTopTeacher(): Observable<ITopTeacher[]> {
    return this.httpclient.get<ITopTeacher[]>(
      `${environment.baseUrl}/api/Teacher/GetTopTeachers`
    );
  }

  GetCurrentCourses(): Observable<ICurrentCourses[]> {
    return this.httpclient.get<ICurrentCourses[]>(
      `${environment.baseUrl}/api/Course/GetThreeCoursesForCategory`
    );
  }

  GetNumOfEnrolledCourses(): Observable<Number> {
    return this.httpclient.get<Number>(
      `${environment.baseUrl}/api/Student/GetTotalNumOfEnrolledCourses`
    );
  }

  GetTopStudent(): Observable<ITopStudent[]> {
    return this.httpclient.get<ITopStudent[]>(
      `${environment.baseUrl}/api/Student/GetTopStudent`
    );
  }
  GetNotApprovedCourses(): Observable<IcourseNotApproved[]> {
    return this.httpclient.get<IcourseNotApproved[]>(
      `${environment.baseUrl}/api/Course/GetNotApprovedCourses`
    );
  }
  ApproveCourse(CourseId:number):Observable<IcourseNotApproved>{
    return this.httpclient.put<IcourseNotApproved>(
      `${environment.baseUrl}/api/Course/ApproveCourse?courseId=${CourseId}`,CourseId
    );
  }
  GetTotalInstructorEarning(): Observable<Number> {
    return this.httpclient.get<Number>(
      `${environment.baseUrl}/api/Earning/GetTotalInstructorEarnings`
    );
  }
  GetTotalWebsiteEarning(): Observable<Number> {
    return this.httpclient.get<Number>(
      `${environment.baseUrl}/api/Earning/GetTotalWebsiteEarnings`
    );
  }

  GetTotalEarning(): Observable<Number> {
    return this.httpclient.get<Number>(
      `${environment.baseUrl}/api/Earning/GetTotalEarning`
    );
  }

  GetAllCourses(): Observable<ICourseCardDetails[]> {
    return this.httpclient.get<ICourseCardDetails[]>(
      `${environment.baseUrl}/api/Course/GetAllCoursesAsCards`
    );
  }
  DeleteCourse(courseId:number):Observable<ICourseCardDetails>{
    return this.httpclient.delete<ICourseCardDetails>(
      `${environment.baseUrl}/api/Course/DeleteCourse?courseId=${courseId}`
    );
  }

  DeleteTeacher(teacherId:Number):Observable<ITeacher>{
    return this.httpclient.delete<ITeacher>(
      `${environment.baseUrl}/api/Teacher/DeleteTeacher?teacherId=${teacherId}`
    );
  }

  GetAllTeachers(): Observable<ITeacher[]> {
    return this.httpclient.get<ITeacher[]>(
      `${environment.baseUrl}/api/Teacher/GetTeachers`
    );
  }

  GetAllStudents(): Observable<IStudent[]> {
    return this.httpclient.get<IStudent[]>(
      `${environment.baseUrl}/api/Student/GetAll`
    );
  }

  DeleteStudent(studentId:Number):Observable<IStudent>{
    return this.httpclient.delete<IStudent>(
      `${environment.baseUrl}/api/Student/Delete/${studentId}`
    );
  }

  GetTeacherWithHisEarning(): Observable<ITeacherEarning[]> {
    return this.httpclient.get<ITeacherEarning[]>(
      `${environment.baseUrl}/api/Earning/GetTeachersAndEarnings`
    );
  }
  GetTopEarningCourses(): Observable<IcourseEarning[]> {
    return this.httpclient.get<IcourseEarning[]>(
      `${environment.baseUrl}/api/Course/GetTopEarningCourses`
    );
  }
  GetCoursesAndEarningsForInstructor(InstructorId:number): Observable<IcourseEarning[]> {
    return this.httpclient.get<IcourseEarning[]>(
      `${environment.baseUrl}/api/Earning/GetCoursesAndEarningsForInstructor/${InstructorId}`
    );
  }
}


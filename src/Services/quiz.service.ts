import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  stdDegree: number = -1;
  stdState: string = '';
  constructor(private http: HttpClient) {}
  changeQuizState(id: number, status: boolean): Observable<any> {
    const api_key = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${api_key}`);
    return this.http.get<any>(
      `${environment.baseUrl}/api/Quiz/ChangeQuizState/${id}?status=${status}`,
      { headers: header }
    );
  }
  getQuiz(CourseId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.baseUrl}/api/Quiz/GetQuizByCourseId/${CourseId}`
    );
  }
}

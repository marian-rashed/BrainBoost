import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Enviroment/enviroment';
import { Observable } from 'rxjs';
import { IReview } from '../models/ireview';
import { IReviewSomeDetails } from '../models/ireview-some-details';

@Injectable({
  providedIn: 'root'
})
export class IReviewService {

  constructor(private http:HttpClient) { }
  changeReview(rev:IReview):Observable<any>{
    const api_key = localStorage.getItem("token");
    const header= new HttpHeaders().set('Authorization', `Bearer ${api_key}`)
    const body = {
      Id: rev.id,
      Content: rev.content,
      CourseId: rev.courseId,
      Rate: rev.rate
  };

    return this.http.post<any>(`${environment.baseUrl}/api/Review/SetReview`,body,{headers: header})
 }
 changeRate(rev:IReview):Observable<any>{
  const api_key = localStorage.getItem("token");
  const header= new HttpHeaders().set('Authorization', `Bearer ${api_key}`)
  const body = {
    Id: rev.id,
    Content: rev.content,
    CourseId: rev.courseId,
    Rate: rev.rate
};

  return this.http.post<any>(`${environment.baseUrl}/api/Review/SetRate`,body,{headers: header})
}
getReview(id: number):Observable<IReviewSomeDetails[]>
{
  const api_key = localStorage.getItem("token");
  const header= new HttpHeaders().set('Authorization', `Bearer ${api_key}`)
  return this.http.get<IReviewSomeDetails[]>(
    `${environment.baseUrl}/api/Review/Getreviews/${id}`
  );
}
}

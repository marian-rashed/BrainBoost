import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Enviroment/enviroment';
import { IVideoState } from '../models/ivideo-state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VidService {
  constructor(private http: HttpClient) {}
  GetTakingVideos(id: number): Observable<IVideoState[]> {
    const api_key = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${api_key}`);
    return this.http.get<IVideoState[]>(
      `${environment.baseUrl}/api/Video/GetCourseVideos/${id}`,
      { headers: header }
    );
  }
  changeVideoState(id: number, status: boolean): Observable<IVideoState[]> {
    const api_key = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${api_key}`);
    return this.http.get<IVideoState[]>(
      `${environment.baseUrl}/api/Video/ChangeVideoState/${id}?status=${status}`,
      { headers: header }
    );
  }
  changeAllVideoState(id: number, status: boolean): Observable<any> {
    const api_key = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${api_key}`);
    return this.http.get<any>(
      `${environment.baseUrl}/api/Video/ChangeAllVideosState/${id}?status=${status}`,
      { headers: header }
    );
  }
  getVideosByCourseId(CourseId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.baseUrl}/api/Video/getVideosByCourseId/${CourseId}`
    );
  }
  updateVideo(editedVideo: {
    id:number
    Title:string
    VideoFile:File
    Chapter:number
    crsId:number
}): Observable<any[]> {
    const formDate = new FormData()
    formDate.append('title', editedVideo.Title)
    formDate.append('videoFile', editedVideo.VideoFile)
    formDate.append('crsId', editedVideo.crsId.toString())
    formDate.append('id', editedVideo.id.toString())
    return this.http.put<any[]>(
      `${environment.baseUrl}/api/Video/editVideo`,
      formDate
    );
  }
}

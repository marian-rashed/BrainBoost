import { Injectable } from '@angular/core';
import { IGetComment } from '../../models/videomodel/iget-comment';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../Enviroment/enviroment';
import { IAddcomment } from '../../models/videomodel/iaddcomment';

type NewType = Observable<IGetComment[]>;

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}
  GetComments(vidId: number): NewType {
    const api_key = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${api_key}`);
    return this.http.get<IGetComment[]>(
      `${environment.baseUrl}/api/Comment/getComment/${vidId}`,
      { headers: header }
    );
  }
  AddComments(comment: IAddcomment): Observable<IGetComment[]> {
    const api_key = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${api_key}`);
    const body = {
      Id: comment.id,
      Content: comment.content,
      VideoId: comment.videoId,
    };
    return this.http.post<IGetComment[]>(
      `${environment.baseUrl}/api/Comment/addComment/`,
      body,
      { headers: header }
    );
  }
}

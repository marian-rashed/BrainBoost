// student.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../Enviroment/enviroment';
import { StudentDTO } from '../../models/student-dto';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private httpclient: HttpClient) {}

  GetStudentData(studentId: number): Observable<any> {
    return this.httpclient.get<any>(`${environment.baseUrl}/api/Student/GetById/${studentId}`);
  }

  
  updateStudent(student: StudentDTO): Observable<any> {
    const formData = new FormData();
    formData.append('Id', student.id.toString());
    formData.append('Fname', student.fname!);
    formData.append('Lname', student.lname!);

    return this.httpclient.put<any>(`${environment.baseUrl}/api/Student/Update`, formData);
  }

  uploadImage(file: File, studentId: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.httpclient.post(`${environment.baseUrl}/api/Student/uploadimage/${studentId}`, formData,
      { headers: headers, responseType: 'text' as 'json' } );
  }

  updatePassword(request: { UserId: string; CurrentPassword: string; NewPassword: string; }): Observable<any> {
    return this.httpclient.post(`${environment.baseUrl}/api/Student/UpdatePassword`, request);
  }
}



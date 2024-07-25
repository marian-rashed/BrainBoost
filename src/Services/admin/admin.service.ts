import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iadmin } from '../../models/iadmin';
import { environment } from '../../Enviroment/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpclient:HttpClient) { }
  GetAllAdmins(): Observable<Iadmin[]> {
    return this.httpclient.get<Iadmin[]>(
      `${environment.baseUrl}/api/Admin/GetAllAdmins`
    );
  }
  UpdateAdmin(updatedAdmin:Iadmin): Observable<Iadmin> {
    return this.httpclient.put<Iadmin>(
      `${environment.baseUrl}/api/Admin/UpdateAdminData`,updatedAdmin
    );
  }
  DeleteAdmin(adminId:Number):Observable<Iadmin>{
    return this.httpclient.delete<Iadmin>(
      `${environment.baseUrl}/api/Admin/DeleteAdmin/${adminId}`
    );
  }
 uploadPhoto(photo: File, adminId: number): Observable<string> {
    const formData = new FormData();
    formData.append('file', photo, photo.name);

    // Note: Ensure correct headers for file upload
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    
    return this.httpclient.post<string>(
      `${environment.baseUrl}/api/Admin/uploadimage/${adminId}`,
      formData,
      { headers: headers, responseType: 'text' as 'json' } // Specify responseType as 'text'
    );
  }

}

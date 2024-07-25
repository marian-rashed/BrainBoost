import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../../models/icategory';
import { environment } from '../../Enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}
  getAllCategory(): Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>(
      `${environment.baseUrl}/api/Category/GetAllCategories`
    );
  }
  getCategoryById(id: number): Observable<ICategory> {
    return this.httpClient.get<ICategory>(
      `${environment.baseUrl}/api/Category/GetCategoryById/${id}`
    );
  }

  DeleteCategory(categoryId:Number):Observable<ICategory>{
    return this.httpClient.delete<ICategory>(
      `${environment.baseUrl}/api/Category/DeleteCategory/${categoryId}`
    );
  }

  addCategory(category: ICategory): Observable<ICategory> {
    return this.httpClient.post<ICategory>(`${environment.baseUrl}/api/Category/addCategory`, category);
  }

  updateCategory(category: ICategory): Observable<ICategory> {
    return this.httpClient.put<ICategory>(
      `${environment.baseUrl}/api/Category/UpdateCategory/${category.id}`, category
    );
  }
}

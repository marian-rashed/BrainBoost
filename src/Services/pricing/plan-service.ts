import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlan } from '../../models/iplan';
import { environment } from '../../Enviroment/enviroment';
import { IPaymentUrl } from '../../models/ipayment-url';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  constructor(private httpClient: HttpClient) {}

  getAllPlans(): Observable<IPlan[]> {
    return this.httpClient.get<IPlan[]>(
      `${environment.baseUrl}/api/Plan/GetAll`
    );
  }
  getPlanById(): Observable<IPlan> {
    return this.httpClient.get<IPlan>(
      `${environment.baseUrl}/api/Plan/GetById`
    );
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISubscribtion } from '../../models/isubscribtion';
import { IPaymentUrl } from '../../models/ipayment-url';
import { environment } from '../../Enviroment/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  constructor(private httpclient: HttpClient) {}

  createSubscription(subscriptionData: ISubscribtion): Observable<IPaymentUrl> {
    const autoToken = localStorage.getItem('BrainBoostJwtToken');
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${autoToken}`
    );
    return this.httpclient.post<IPaymentUrl>(
      `${environment.baseUrl}/api/Subscription/Create`,
      subscriptionData,
      { headers: header }
    );
  }
}

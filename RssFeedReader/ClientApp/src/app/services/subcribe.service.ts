import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from '../models/subscription';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcribeService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getSubscriptions(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(this.baseUrl + 'subscriptions');
  }

  saveSubscription(feedId:number, userId:number): Observable<Subscription> {
    const subscription = new Subscription();
    subscription.feedId = feedId;
    subscription.userId = userId;
    return this.http.post<Subscription>(this.baseUrl + 'subscriptions', subscription);
  }

  unSubscribe(feedId:number, userId:number): Observable<Subscription> {
    const subscription = new Subscription();
    subscription.feedId = feedId;
    subscription.userId = userId;
    return this.http.post<Subscription>(this.baseUrl + 'subscriptions/unsubscribe', subscription);
  }
}

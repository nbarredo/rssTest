import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feed } from '../models/Feed';
import { FeedDetails } from '../models/feed-details';
import { FeedViewModel } from '../models/feed-view-model';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  saveFeed(url: string): Observable<Feed> {
    const feed = new Feed();
    feed.url = url;
    return this.http.post<Feed>(this.baseUrl + 'feeds', feed);
  }
  getFeedDetail(id:string): Observable<FeedDetails> {
    return this.http.get<FeedDetails>(this.baseUrl + 'feeds/'+id);
  }

  getFeeds(): Observable<Feed[]> {
    return this.http.get<Feed[]>(this.baseUrl + 'feeds');
  }

  getFeedsDetails(): Observable<FeedViewModel[]> {
    return this.http.get<FeedViewModel[]>(this.baseUrl + 'feeds/details');
  }
  getMyFeeds(userId:number): Observable<FeedViewModel[]> {
    return this.http.get<FeedViewModel[]>(this.baseUrl + 'feeds/my/'+userId);
  }
}

import { Component, OnInit } from '@angular/core';
import { FeedService } from 'src/app/services/feed.service';
import { FeedViewModel } from 'src/app/models/feed-view-model';
import { FeedItem } from 'src/app/models/feed-item';

@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.css']
})
export class AllNewsComponent implements OnInit {

  constructor(
    private feedService: FeedService
  ) { }
  feeds: FeedViewModel[];
  allNews: FeedItem[];
  search: string;
  ngOnInit() {
    this.feedService.getFeedsDetails().subscribe(result => {
      this.feeds = result;
      this.allNews = this.feeds.map(f => f.details.items).reduce((a, b)=>  a.concat(b));
    });
  }

}

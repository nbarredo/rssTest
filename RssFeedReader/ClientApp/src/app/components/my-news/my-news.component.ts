import { Component, OnInit } from '@angular/core';
import { FeedService } from 'src/app/services/feed.service';
import { FeedViewModel } from 'src/app/models/feed-view-model';
import { FeedItem } from 'src/app/models/feed-item';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { flatMap, map } from 'rxjs/operators';


@Component({
  selector: 'app-my-news',
  templateUrl: './my-news.component.html',
  styleUrls: ['./my-news.component.css']
})
export class MyNewsComponent implements OnInit {


  constructor(
    private feedService: FeedService,
    private userService: UserService
  ) { }
  feeds: FeedViewModel[];
  allNews: FeedItem[];
  search: string;
  ngOnInit() {
    this.userService.getUser().pipe(flatMap((user:User) => {
      return this.feedService.getMyFeeds(user.id);
    })).subscribe((result:FeedViewModel[]) => {
      this.feeds = result;
      if (this.feeds && this.feeds.length) {
        this.allNews = this.feeds.map(f => f.details.items).reduce((a, b) => a.concat(b));

      }
    });
  }
}

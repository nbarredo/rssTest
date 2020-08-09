import { Component, OnInit } from '@angular/core';
import { FeedService } from 'src/app/services/feed.service';
import { ActivatedRoute } from '@angular/router';
import { FeedViewModel } from 'src/app/models/feed-view-model';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.css']
})
export class FeedListComponent implements OnInit {

  constructor(
    private feedService: FeedService) { }
  feeds: FeedViewModel[];
  ngOnInit() {
    this.feedService.getFeedsDetails().subscribe(result => {
      this.feeds = result;
    });
  }

}

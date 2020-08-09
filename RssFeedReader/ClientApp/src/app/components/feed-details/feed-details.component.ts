import { Component, OnInit } from '@angular/core';
import { FeedDetails } from 'src/app/models/feed-details';
import { FeedService } from 'src/app/services/feed.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { SubcribeService } from 'src/app/services/subcribe.service';

@Component({
  selector: 'app-feed-details',
  templateUrl: './feed-details.component.html',
  styleUrls: ['./feed-details.component.css']
})
export class FeedDetailsComponent implements OnInit {

  constructor(
    private feedService: FeedService,
    private route: ActivatedRoute) { }
  feed: FeedDetails;
  id: number;
  search: string;

  ngOnInit() {

    this.id = +this.route.snapshot.paramMap.get('feedId');
    this.feedService.getFeedDetail(this.id.toString()).subscribe(result => {
      this.feed = result;
    });
  }

}

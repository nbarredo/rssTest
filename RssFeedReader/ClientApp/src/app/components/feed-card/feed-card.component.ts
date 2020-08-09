import { Component, OnInit, Input } from '@angular/core';
import { Feed } from 'src/app/models/Feed';
import { FeedService } from 'src/app/services/feed.service';
import { SubcribeService } from 'src/app/services/subcribe.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { FeedDetails } from 'src/app/models/feed-details';

@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.css']
})
export class FeedCardComponent implements OnInit {

  constructor(
    private subscribeService: SubcribeService,
    private userService: UserService) { }

  @Input() feed: FeedDetails;
  @Input() feedId: number;
  user: User;
  get isSubscribed(): boolean {
    return this.user && this.user.subscription && this.user.subscription.some(s => s.feedId === this.feedId);
  }
  ngOnInit() {
    this.getUser();
  }
  private getUser() {
    this.userService.getUser().subscribe(user => {
      this.user = user;
    });
  }
  action() {
    if (this.isSubscribed) {
      this.unSubscribe();
    } else {
      this.subscribe();
    }
  }
  subscribe() {
    this.subscribeService.saveSubscription( this.feedId, this.user.id).subscribe(() => {
      this.getUser();
    });
  }
  unSubscribe() {
    this.subscribeService.unSubscribe( this.feedId, this.user.id).subscribe(() => {
      this.getUser();
    });
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { FeedItem } from 'src/app/models/feed-item';

@Component({
  selector: 'app-feed-item-card',
  templateUrl: './feed-item-card.component.html',
  styleUrls: ['./feed-item-card.component.css']
})
export class FeedItemCardComponent implements OnInit {

  constructor() { }
  @Input() feedItem: FeedItem;
  @Input() feedName: string;
  ngOnInit() {
  }

}

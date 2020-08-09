import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FeedService } from '../../services/feed.service';
import { Feed } from '../../models/Feed';

@Component({
  selector: 'app-add-feed',
  templateUrl: './add-feed.component.html',
  styleUrls: ['./add-feed.component.css']
})
export class AddFeedComponent implements OnInit {
  public myreg = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi
  urlFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.myreg),
  ]);
  feeds: Feed[];
  constructor(private feedService: FeedService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getFeeds();
  }
  private getFeeds() {
    this.feedService.getFeeds().subscribe(result => {
      this.feeds = result;
    }, error => this._snackBar.open(error.error));; 
  }

  add() {
    this.feedService.saveFeed(this.urlFormControl.value).subscribe(result => {
      this._snackBar.open('Success adding feed');
      this.urlFormControl.reset();
      this.getFeeds();
    }, error => {
      this._snackBar.open(error.error)
    });
  }
}

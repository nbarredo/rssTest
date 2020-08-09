import { Pipe, PipeTransform } from '@angular/core';
import { FeedItem } from '../models/feed-item';

@Pipe({
  name: 'filterNews'
})
export class FilterNewsPipe implements PipeTransform {

  transform(value: FeedItem[], input: string): any {
    if (!value) {
      return [];
    }
    if (!input) {
      return value;
    }
    let valuesArr = []
    if (input) {
      return value.filter((el: FeedItem) => {
        return el.title.toLowerCase().includes(input.toLowerCase()) || el.description.toLowerCase().includes(input.toLowerCase());
      })
    }
  }

}

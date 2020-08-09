import { FeedType } from './feed-type.enum';
import { FeedItem } from './feed-item';

export interface FeedDetails {
  type: FeedType;
  title: string;
  link: string;
  description: string;
  language: string;
  copyright: string;
  lastUpdatedDateString: string;
  lastUpdatedDate: string | null;
  imageUrl: string;
  items: FeedItem[];
  originalDocument: string;

}

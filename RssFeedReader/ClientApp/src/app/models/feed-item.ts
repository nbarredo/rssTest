export interface FeedItem {
  title: string;
  link: string;
  description: string;
  publishingDateString: string;
  publishingDate: string | null;
  author: string;
  id: string;
  categories: string[];
  content: string;
}

export interface Link {
  id: string | number;
  url: string;
  title: string;
  description: string;
  image?: string | undefined;
}

export type Category =
  | 'video'
  | 'article'
  | 'stackoverflow'
  | 'github'
  | 'reddit'
  | 'other';

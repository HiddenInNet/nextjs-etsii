export interface Article {
  Post: any;
  frontmatter: Frontmatter;
}

export interface Frontmatter {
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  cover_url: string;
}

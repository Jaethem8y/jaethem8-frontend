export type Post = {
  title: string;
  description: string;
  contents: Content[];
};

export type BlogPost = {
  title: string;
  role: string;
  frontend: string;
  backend: string;
  description: string;
  general: string;
  contents: Content[];
};

export type Content = {
  location: number;
  header: string;
  content: string;
  code: string;
  links: Link[];
  images: Image[];
};

export type Link = {
  tag: string;
  link: string;
};

export type Image = {
  image: string;
};

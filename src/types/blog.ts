export type BlogContent = {
  location: number;
  header:string;
  content: string;
  link:string;
  image: string;
  code: string;
};

export type BlogPost = {
  title: string;
  role: string;
  frontend: string;
  backend: string;
  general: string;
  contents: Array<BlogContent>;
};

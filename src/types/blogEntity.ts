export type BlogContent = {
  id: number;
  postName: string;
  location: number;
  content: string;
  image: string;
  code: string;
};

export type BlogPost = {
  id: number;
  title: string;
  date: string;
  role: string;
  frontend: string;
  backend: string;
  general: string;
  contents: Array<BlogContent>;
};

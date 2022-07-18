export type PersonalContent = {
  location: number;
  header:string;
  content: string;
  link:string;
  image: string;
  code: string;
};

export type PersonalPost = {
  title: string;
  contents: Array<PersonalContent>;
};

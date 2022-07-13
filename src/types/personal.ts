export type PersonalContent = {
  location: number;
  content: string;
  image: string;
  code: string;
};

export type PersonalPost = {
  title: string;
  contents: Array<PersonalContent>;
};

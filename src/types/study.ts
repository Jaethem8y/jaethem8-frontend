export type StudyContent = {
  location: number;
  header: string;
  content: string;
  link: string;
  image: string;
  code: string;
};

export type StudyPost = {
  title: string;
  contents: Array<StudyContent>;
};

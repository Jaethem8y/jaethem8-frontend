export type StudyContent = {
  location: number;
  content: string;
  image: string;
  code: string;
};

export type StudyPost = {
  title: string;
  contents: Array<StudyContent>;
};

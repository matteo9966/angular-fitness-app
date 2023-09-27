export interface IcourseData {
  title: string;
  description: string;
  subtitle: string;
  longDescription: string;
  shortDescription: string;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  extraDescriptions: { title: string; description: string; icon: string }[];
  imageBg: string;
}

export interface IcourseData {
    title: string;
    description: string;
    subtitle: string;
    longDescription: string;
    shortDescription: string;
    difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
    group: boolean;
    groupSize: [number, number]; //min max
    classDuration: number;
    imageBg: string;
  }
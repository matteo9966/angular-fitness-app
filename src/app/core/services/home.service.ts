import { Injectable } from '@angular/core';

import { IcourseData } from 'src/app/core/models/IcourseData.interface';
import { of } from 'rxjs';
const mockCourseData: IcourseData = {
  title: 'Extreme fat loss',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  longDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.

  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor.`,
  shortDescription:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Lorem ipsum dolor sit amet, consectetur adip.',
  difficultyLevel: 'beginner',
  extraDescriptions: [
    {
      icon: 'timer',
      description: 'from 25 to 45 minutes',
      title: 'Class duration',
    },
    { icon: 'group', description: 'from 5 to 15 people', title: 'Group title' },
  ],

  imageBg:
    'https://assets.website-files.com/55f33a0152c98c9a451281aa/5e34486bd4897db8c07c1284_person-holding-barbell-841130.jpg',
};

const mockCourseData2: IcourseData = {
  title: 'Some serious fat loss',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  longDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.

  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor.`,
  shortDescription:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Lorem ipsum dolor sit amet, consectetur adip.',
  difficultyLevel: 'intermediate',
  extraDescriptions: [
    {
      icon: 'timer',
      description: 'from 40 to 55 minutes',
      title: 'Class duration',
    },
    { icon: 'group', description: 'from 2 to 25 people', title: 'Group size' },
    {
      icon: 'military_tech',
      description: 'Best course in 2023',
      title: 'New york times',
    },
  ],

  imageBg:
    'https://assets.website-files.com/55f33a0152c98c9a451281aa/5e344812c4538237bd5a6498_rope-jumping-ropes-human-training-28080.jpg',
};
const mockCourseData3: IcourseData = {
  title: 'Hypertrophy made simple',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  longDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.

  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor.`,
  shortDescription:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Lorem ipsum dolor sit amet, consectetur adip.',
  difficultyLevel: 'advanced',
  extraDescriptions: [
    {
      icon: 'timer',
      description: 'from 40 to 55 minutes',
      title: 'Class duration',
    },
    { icon: 'group', description: 'from 2 to 25 people', title: 'Group size' },
    {
      icon: 'military_tech',
      description: 'Best course in 2023',
      title: 'New york times',
    },
  ],

  imageBg:
    'https://assets.website-files.com/55f33a0152c98c9a451281aa/5e344812c4538237bd5a6498_rope-jumping-ropes-human-training-28080.jpg',
};

@Injectable()
export class HomeService {
  courses: Record<string, IcourseData> = {
    fatlossAdvanced: mockCourseData,
    fatLossBeginner: mockCourseData2,
    fatLossIntermediate: mockCourseData3,
  };

  constructor() {
    console.log('home service initialized');
  }

  //this is like an http
  getCourseById(id: string) {
    const course = this.courses[id];
    if (!course) {
      return of(null);
    }
    return of(course);
  }
}

import { Injectable } from '@angular/core';

import { IcourseData } from 'src/app/core/models/IcourseData.interface';
import { of } from 'rxjs';
import {
  mockCourseData,
  mockCourseData2,
  mockCourseData3,
} from '../../../core/mocks/coursesMocks';

import { blogPost1, blogPost2, blogPost3 } from '../../../core/mocks/blogPreviewsMocks';
import { IBlogPreview } from '../../../core/models/IBlogPreviews.interface';

@Injectable()
export class HomeService {
  courses: Record<string, IcourseData> = {
    fatlossAdvanced: mockCourseData,
    fatLossBeginner: mockCourseData2,
    fatLossIntermediate: mockCourseData3,
  };

  blogPosts: Record<string, IBlogPreview> = {
    'author-id-1': blogPost1,
    'author-id-2': blogPost2,
    'author-id-3': blogPost3,
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

  getBlogPostPreviews() {
    return of(Object.values(this.blogPosts));
  }

  getBlogPostById(id: string) {
    //this should return the data for a blog post page
  }
}

import { Routes } from '@angular/router';
import { courseDataResolver } from './resolvers/course-data.resolver';

export const homeRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/landing/landing.component').then(
        (c) => c.LandingComponent
      ),
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./pages/blog/blog.component').then((b) => b.BlogComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/course-info/course-info.component').then(
        (c) => c.CourseInfoComponent
      ),
    resolve: {
      courseData: courseDataResolver,
    },
  },
  {
    path: '**',
    loadComponent: () =>
      import('../../shared/pages/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];

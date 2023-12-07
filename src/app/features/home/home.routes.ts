import { Routes } from '@angular/router';
import { courseDataResolver } from './resolvers/course-data.resolver';
import { blogPreviewsResolver } from './resolvers/blog-previews.resolver';
import { ROUTES } from 'src/app/core/shared/app-routes';
import { ReviewFormService } from './services/review-form.service';

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
    path: ROUTES.home.children.blog.path,
    loadComponent: () =>
      import('./pages/blog/blog.component').then((b) => b.BlogComponent),
    resolve: {
      blogPostPreviews: blogPreviewsResolver,
    },
  },
  {
    path: ROUTES.home.children.review.path,
    loadComponent: () =>
      import('./pages/review/review.component').then((c) => c.ReviewComponent),
    providers: [ReviewFormService],
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

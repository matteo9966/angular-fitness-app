import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { IBlogPreview } from 'src/app/core/models/IBlogPreviews.interface';
import { HomeService } from 'src/app/features/home/services/home.service';
import { Observable, map } from 'rxjs';
export const blogPreviewsResolver: ResolveFn<Observable<IBlogPreview[]>> = (
  route,
  state
) => {
  const homeService = inject(HomeService);

  return homeService.getBlogPostPreviews().pipe(
    map((data) => {
      if (data) {
        return data;
      }
      return [];
    })
  );
};

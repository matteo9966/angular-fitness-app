import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { blogPreviewsResolver } from './blog-previews.resolver';

describe('blogPreviewsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => blogPreviewsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

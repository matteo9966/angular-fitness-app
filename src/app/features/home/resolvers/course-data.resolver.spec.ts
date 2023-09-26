import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { courseDataResolver } from './course-data.resolver';

describe('courseDataResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => courseDataResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

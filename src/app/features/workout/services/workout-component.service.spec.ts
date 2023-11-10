import { TestBed } from '@angular/core/testing';

import { WorkoutComponentService } from './workout-component.service';

describe('WorkoutComponentService', () => {
  let service: WorkoutComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

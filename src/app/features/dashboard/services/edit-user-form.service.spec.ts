import { TestBed } from '@angular/core/testing';

import { EditUserFormService } from './edit-user-form.service';

describe('EditUserFormService', () => {
  let service: EditUserFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditUserFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

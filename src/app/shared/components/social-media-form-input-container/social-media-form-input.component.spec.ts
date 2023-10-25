import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaFormInputComponent } from './social-media-form-input.component';

describe('SocialMediaFormInputComponent', () => {
  let component: SocialMediaFormInputComponent;
  let fixture: ComponentFixture<SocialMediaFormInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SocialMediaFormInputComponent]
    });
    fixture = TestBed.createComponent(SocialMediaFormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

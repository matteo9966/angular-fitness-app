import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaInputComponent } from './social-media-input.component';

describe('SocialMediaInputComponent', () => {
  let component: SocialMediaInputComponent;
  let fixture: ComponentFixture<SocialMediaInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SocialMediaInputComponent]
    });
    fixture = TestBed.createComponent(SocialMediaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

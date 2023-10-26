import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSocialsLinksComponent } from './profile-socials-links.component';

describe('ProfileSocialsLinksComponent', () => {
  let component: ProfileSocialsLinksComponent;
  let fixture: ComponentFixture<ProfileSocialsLinksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfileSocialsLinksComponent]
    });
    fixture = TestBed.createComponent(ProfileSocialsLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

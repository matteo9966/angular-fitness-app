import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationToolbarComponent } from './authentication-toolbar.component';

describe('AuthenticationToolbarComponent', () => {
  let component: AuthenticationToolbarComponent;
  let fixture: ComponentFixture<AuthenticationToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuthenticationToolbarComponent]
    });
    fixture = TestBed.createComponent(AuthenticationToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

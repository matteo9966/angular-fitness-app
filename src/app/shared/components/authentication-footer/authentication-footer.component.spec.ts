import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationFooterComponent } from './authentication-footer.component';

describe('AuthenticationFooterComponent', () => {
  let component: AuthenticationFooterComponent;
  let fixture: ComponentFixture<AuthenticationFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuthenticationFooterComponent]
    });
    fixture = TestBed.createComponent(AuthenticationFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

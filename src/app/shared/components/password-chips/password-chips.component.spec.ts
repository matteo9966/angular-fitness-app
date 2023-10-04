import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordChipsComponent } from './password-chips.component';

describe('PasswordChipsComponent', () => {
  let component: PasswordChipsComponent;
  let fixture: ComponentFixture<PasswordChipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PasswordChipsComponent]
    });
    fixture = TestBed.createComponent(PasswordChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

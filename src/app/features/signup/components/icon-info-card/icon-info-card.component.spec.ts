import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconInfoCardComponent } from './icon-info-card.component';

describe('IconInfoCardComponent', () => {
  let component: IconInfoCardComponent;
  let fixture: ComponentFixture<IconInfoCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IconInfoCardComponent]
    });
    fixture = TestBed.createComponent(IconInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

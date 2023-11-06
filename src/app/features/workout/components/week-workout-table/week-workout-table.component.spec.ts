import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekWorkoutTableComponent } from './week-workout-table.component';

describe('WeekWorkoutTableComponent', () => {
  let component: WeekWorkoutTableComponent;
  let fixture: ComponentFixture<WeekWorkoutTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WeekWorkoutTableComponent]
    });
    fixture = TestBed.createComponent(WeekWorkoutTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

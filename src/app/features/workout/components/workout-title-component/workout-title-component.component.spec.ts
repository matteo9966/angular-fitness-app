import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutTitleComponentComponent } from './workout-title-component.component';

describe('WorkoutTitleComponentComponent', () => {
  let component: WorkoutTitleComponentComponent;
  let fixture: ComponentFixture<WorkoutTitleComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutTitleComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkoutTitleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

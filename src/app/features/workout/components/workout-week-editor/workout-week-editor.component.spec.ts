import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutWeekEditorComponent } from './workout-week-editor.component';

describe('WorkoutWeekEditorComponent', () => {
  let component: WorkoutWeekEditorComponent;
  let fixture: ComponentFixture<WorkoutWeekEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutWeekEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkoutWeekEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthSelectComponent } from 'src/app/shared/components/month-select/month-select.component';
import { FormsModule } from '@angular/forms';
import { ComponentHostDirective } from 'src/app/core/directives/component-host.directive';
import { WorkoutWeekEditorComponent } from '../workout-week-editor/workout-week-editor.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Exercise } from 'src/app/core/models/Workout/IWorkout.interface';
@Component({
  selector: 'app-workout-editor',
  standalone: true,
  imports: [
    CommonModule,
    MonthSelectComponent,
    FormsModule,
    ComponentHostDirective,
    MatButtonModule,
    MatIconModule,
    WorkoutWeekEditorComponent,
  ],
  templateUrl: './workout-editor.component.html',
  styleUrl: './workout-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutEditorComponent  {
  @ViewChild(ComponentHostDirective, { static: true })
  hostDirective!: ComponentHostDirective;
  _month = new Date().getMonth();

  weeks: Record<number, Exercise[]> = {};

  weekCount = 0;
  get month() {
    return this._month;
  }
  set month(val: number) {
    this._month = val;
  }

  addWeekEditor() {
    this.weekCount += 1;
    this.weeks[this.weekCount] = [exerciseFactory(this.weekCount)];
  }

  get weeksExercisesList() {
    return Object.entries(this.weeks);
  }

  /**
   * @description listens to the add event on the week editor to add to an element
   * @param week 
   */
  addExercise(week: number) {
    const weekExList = this.weeks[week];
    weekExList.push(exerciseFactory(week))
    this.weeks[week] = [...weekExList];
  }

  removeExercise(exercise:Exercise){
    console.log("DELETE THIS:",exercise)
  }
}

function exerciseFactory(week: number) {
  const exercise: Exercise = {
    day: 0,
    exercise: '',
    exerciseRef: '',
    notes: '',
    reps: 0,
    rest: 0,
    sets: 0,
    weight:0,
    week: week,
    userNotes: '',
    id: Math.random().toString(16).slice(2),
  };
  return exercise;
}

import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ChipsComponent } from 'src/app/shared/components/chips/chips.component';
import { NumberArrayToMonthArrayPipe } from "../../pipes/number-array-to-month-array.pipe";
@Component({
    selector: 'app-workouts-table',
    standalone: true,
    templateUrl: './workouts-table.component.html',
    styleUrls: ['./workouts-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatTableModule, JsonPipe, ChipsComponent, NumberArrayToMonthArrayPipe]
})
export class WorkoutsTableComponent {
  tableData = [
    { year: 2022, months: [9, 10, 11, 12] },
    { year: 2023, months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  ];

  displayedColumns=['year','months'];
}

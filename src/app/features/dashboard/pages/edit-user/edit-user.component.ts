import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { EditUserFormComponent } from '../../components/edit-user-form/edit-user-form.component';
@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [RouterLink,MatButtonModule,EditUserFormComponent],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditUserComponent {
 
}

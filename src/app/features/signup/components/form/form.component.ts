import { ChangeDetectionStrategy, Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule,Validators } from '@angular/forms';
import { TextInputComponent } from 'src/app/shared/components/text-input/text-input.component';
import { MatButtonModule } from '@angular/material/button';
import { AuthenticationFormContainerComponent } from 'src/app/shared/components/authentication-form-container/authentication-form-container.component';
import { AddMobileClassDirective } from 'src/app/shared/directives/add-mobile-class.directive';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule,MatInputModule,MatIconModule,ReactiveFormsModule,TextInputComponent,ReactiveFormsModule,MatButtonModule,AuthenticationFormContainerComponent,AddMobileClassDirective],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent {
  @Input() formTitle!:string;
  @Input() formSubtitle!:string;
 control = new FormControl('',{validators:[Validators.minLength(3)]})
}

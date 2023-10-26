import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TextInputComponent } from '../text-input/text-input.component';
import { ISocial } from 'src/app/core/models/ISocial.interface';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-social-media-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatListModule,MatSelectModule,MatFormFieldModule,TextInputComponent,MatIconModule],
  templateUrl: './social-media-input.component.html',
  styleUrls: ['./social-media-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialMediaInputComponent {
  @Output() deleteSocial = new EventEmitter<any>()
  @Input() socials:ISocial[]=[];
  @Input({ required: true }) formGroup!: FormGroup<{
    name: FormControl<string>;
    url: FormControl<string>;
  }>;

  get nameControl() {
    return this.formGroup.controls.name;
  }

  get urlControl() {
    return this.formGroup.controls.url;
  }

  onClickDelete(){
    this.deleteSocial.emit()
  }
}

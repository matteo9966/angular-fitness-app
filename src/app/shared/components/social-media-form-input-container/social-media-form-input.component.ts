import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  Injector,
  OnInit,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatListModule } from '@angular/material/list';
/**
 * @description this component is used in conjunction with social-media-input component, it is the only accepted projected component
 */
@Component({
  selector: 'app-social-media-form-input',
  standalone: true,
  imports: [CommonModule, MatListModule, ReactiveFormsModule],
  templateUrl: './social-media-form-input.component.html',
  styleUrls: ['./social-media-form-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialMediaFormInputComponent implements OnInit {
  @Input() formArray!: FormArray<FormGroup<any>>;

  injector = inject(Injector);

  ngOnInit(): void {}

  fb = inject(FormBuilder);

  addControl() {
    const group = this.fb.group({
      name: this.fb.control(''), // add validators one of,
      url: this.fb.control(''),
    });
    this.formArray.push(group);
  }
}

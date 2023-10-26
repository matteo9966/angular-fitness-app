import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  inject,
  Optional,
  forwardRef,
  Injector,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
  FormControlDirective,
  FormControlName,
  NgModel,
  FormGroupDirective,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * @description this is a textinput that can be used only with reactive forms
 */
@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush, TODO: how can i check this element?

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
})
export class TextInputComponent implements OnInit, OnDestroy,ControlValueAccessor {
  writeValue(obj: any): void {
   
  }
  registerOnChange(fn: any): void {
   
  }
  registerOnTouched(fn: any): void {
 
  }
  setDisabledState?(isDisabled: boolean): void {
  
  }
  injector = inject(Injector);
  destroy = new Subject();

  ngOnDestroy(): void {
    this.destroy.next('');
  }

  passwordInput = false;
  control!: FormControl;
  @Input() placeholder!: string;
  @Input() icon!: string;
  @Input() hint!: string;
  @Input() errorMessage!: string;
  @Input() label!: string;
  @Input() type: 'text' | 'password' = 'text';
  @Input() errorStateMatcher!: ErrorStateMatcher;
  @Input() asTextArea: boolean = false;
  submitted = false;

  get passwordVisibilityIcon() {
    return this.type === 'password' ? 'visibility_off' : 'visibility';
  }

  ngOnInit(): void {
    this.setComponentControl(); //this is a way of forwarding the formControl!
    this.passwordInput = this.type === 'password';
  }

  private setComponentControl(): void {
    const injectedControl = this.injector.get(NgControl);
    switch (injectedControl.constructor) {
      case NgModel: {
        const { control, update } = injectedControl as NgModel;

        this.control = control;

        this.control.valueChanges
          .pipe(
            tap((value) => update.emit(value)),
            takeUntilDestroyed()
          )
          .subscribe();
        break;
      }
      case FormControlName: {
        this.control = this.injector
          .get(FormGroupDirective)
          .getControl(injectedControl as FormControlName);
        break;
      }
      default: {
        this.control = (injectedControl as FormControlDirective)
          .form as FormControl;
        break;
      }
    }
  }
}

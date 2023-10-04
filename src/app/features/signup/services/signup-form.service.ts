import { Injectable, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { map, Observable, Subject, merge, tap, startWith, shareReplay } from 'rxjs';
import { mapErrorObject } from 'src/app/core/utils/formsErrorMap';
import { SignupService } from './signup.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { validatePassword } from 'src/app/core/utils/formValidators/passwordValidator.validator';
/**
 * All the business logic goes inside here!
 */
@Injectable()
export class SignupFormService {
  fb = inject(FormBuilder);
  signupService = inject(SignupService);
  snackBarService = inject(MatSnackBar);
  passwordValidationConfig={
    lowercase: 2,
    nospaces: true,
    uppercase: 2,
    symbol: 2,
  };
  passwordValidationLabels = Object.keys(this.passwordValidationConfig);
  

  private _submit = new Subject();
  private submit$ = this._submit.asObservable().pipe(shareReplay(1));
  form: FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
  }>;
  passwordErrorMessage$!: Observable<string>;
  constructor() {
    this.form = this.createForm();
    this.onSubmit = this.onSubmit.bind(this);

    this.passwordErrorMessage$ = merge(
      this.submit$,
      this.passwordControl.valueChanges
    ).pipe(startWith(''),map(() => mapErrorObject(this.passwordControl.errors)));

    merge(
      this.submit$,
      this.passwordControl.valueChanges
    ).subscribe(() => {
      console.log(this.form);
    });
  }

  createForm() {
    const form = this.fb.nonNullable.group({
      name: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.email,
      ]),
      password: this.fb.nonNullable.control('', [
        // Validators.required,
        validatePassword(this.passwordValidationConfig),
      ]),
    });
    return form;
  }

  get nameControl() {
    return this.form.get('name') as FormControl;
  }
  get emailControl() {
    return this.form.get('email') as FormControl;
  }
  get passwordControl() {
    return this.form.get('password') as FormControl;
  }

  get nameErrorMessage$() {
    return merge(
      this.submit$,
      this.nameControl.valueChanges
    ).pipe(startWith(''),map(() => mapErrorObject(this.nameControl.errors)));
  }

  get emailErrorMessage$() {
    return merge(
      this.submit$,
      this.emailControl.valueChanges
    ).pipe(startWith(''),map(() => mapErrorObject(this.emailControl.errors)));
  }

  onSubmit() {
    Object.values(this.form.controls).forEach((c) => {
      c.markAsDirty();
      c.markAsTouched();
    });
    this._submit.next(null);

    const value = this.form.value;
    const { email, password, name } = value;
    if (!email || !password || !name) {
      this.snackBarService.open('Missing email, password or name', 'Close', {
        politeness: 'assertive',

        duration: 3000,
      });
      return;
    }

    if (this.form.invalid) {
      this.snackBarService.open('Invalid form.', 'Close', {
        duration: 3000,
      });
      return;
    }

    this.signupService.authenticationService
      .signupUser({
        email,
        password,
        name,
      })
      .pipe(
        tap(() => {
          this.clearForm(); //clear after submit
        })
      )
      .subscribe({
        next: (user) => {
          console.log(user.id, user.path);
          this.snackBarService.open('You succesfully subscribed!', 'close');
        },
        error: () => {
          this.snackBarService.open('Error while signing up', 'close');
        },
      });
  }

  private clearForm() {
    Object.values(this.form.controls).forEach((c) => {
      c.reset();
      c.markAsPristine();
      c.markAsUntouched();
      c.updateValueAndValidity();
    });
    this.form.reset();
    this.form.markAsUntouched();
    this.form.markAsPristine();
    this.form.updateValueAndValidity();
  }

  passwordErrors(){
  
    const passwordError =this.passwordControl?.errors?.['password'];
    console.log(this.passwordControl?.errors?.['password'])
    if(!passwordError) return [];
    return passwordError
  }


}

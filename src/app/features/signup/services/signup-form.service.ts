import { Injectable, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import {
  map,
  Observable,
  Subject,
  merge,
  tap,
  startWith,
  shareReplay,
  debounceTime,
} from 'rxjs';
import { mapErrorObject } from 'src/app/core/utils/formsErrorMap';
import { SignupService } from './signup.service';

import {
  validate,
  validatePassword,
} from 'src/app/core/utils/formValidators/passwordValidator.validator';
import { SnackbarService } from 'src/app/core/services/Snackbar.service';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/core/shared/app-routes';
/**
 * All the business logic goes inside here!
 */
@Injectable()
export class SignupFormService {
  snackbarService = inject(SnackbarService);
  fb = inject(FormBuilder);
  signupService = inject(SignupService);
  router = inject(Router);
  passwordValidationConfig = {
    lowercase: 2,
    nospaces: true,
    uppercase: 2,
    symbol: 2,
  };
  passwordValidationLabels = Object.keys(this.passwordValidationConfig);

  private _submit = new Subject();
  private submit$ = this._submit.asObservable().pipe(shareReplay(1));
  form = this.fb.nonNullable.group({
    name: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    email: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this.fb.nonNullable.control('', [
      validatePassword(this.passwordValidationConfig),
    ]),
  });
  passwordErrorMessage$!: Observable<string>;

  passwordErrors$ = this.form.controls.password.valueChanges.pipe(
    startWith(validate('', this.passwordValidationConfig)),
    debounceTime(300),
    map((_value) => {
      const passwordError = this.passwordControl?.errors?.['password'];

      if (!passwordError) return [];
      return passwordError;
    })
  );

  constructor() {
    this.onSubmit = this.onSubmit.bind(this);

    this.passwordErrorMessage$ = merge(
      this.submit$,
      this.passwordControl.valueChanges
    ).pipe(
      startWith(''),
      map(() => mapErrorObject(this.passwordControl.errors))
    );

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
    return merge(this.submit$, this.nameControl.valueChanges).pipe(
      startWith(''),
      map(() => mapErrorObject(this.nameControl.errors))
    );
  }

  get emailErrorMessage$() {
    return merge(this.submit$, this.emailControl.valueChanges).pipe(
      startWith(''),
      map(() => mapErrorObject(this.emailControl.errors))
    );
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
      this.snackbarService.errorSnackbar(
        'Missing email, password or name',
        'Close'
      );
      return;
    }

    if (this.form.invalid) {
      this.snackbarService.successSnackbar('Invalid form.', 'Close');
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

          this.snackbarService.successSnackbar(
            'You succesfully subscribed!',
            'close'
          );
          this.router.navigateByUrl(ROUTES.dashboard.absolute)

        }
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
  tooltipMessage = `The password must have: ${
    this.passwordValidationConfig.lowercase
  } lowercase characters, ${
    this.passwordValidationConfig.uppercase
  } uppercase letters, ${
    this.passwordValidationConfig.symbol
  } symbols i.e "- + @"${
    this.passwordValidationConfig.nospaces ? ' and no spaces' : ''
  }.`;
}

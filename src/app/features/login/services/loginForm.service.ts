import { Injectable, inject } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {
  map,
  Subject,
  merge,
  switchMap,
  from,
  tap,
  catchError,
  EMPTY,
} from 'rxjs';
import { mapErrorObject } from 'src/app/core/utils/formsErrorMap';
import { AuthenticationService } from 'src/app/core/services/Authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/core/services/Snackbar.service';
import { FirebaseError } from '@angular/fire/app';
import { ConfigurationService } from 'src/app/core/services/configuration.service';
@Injectable()
export class LoginFormService {
  fb = inject(FormBuilder);
  router = inject(Router);

  authenticationService = inject(AuthenticationService);

  snackbar = inject(MatSnackBar);
  snackbarService = inject(SnackbarService);
  configService = inject(ConfigurationService);
  private _submit = new Subject();
  form = this.fb.nonNullable.group({
    email: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this.fb.nonNullable.control('', [Validators.required]),
  });
  constructor() {
    this.submit = this.submit.bind(this);
  }

  get emailControl() {
    return this.form.get('email') as FormControl;
  }
  get passwordControl() {
    return this.form.get('password') as FormControl;
  }

  emailErrorMessage$ = merge(
    this._submit.asObservable(),
    this.emailControl.valueChanges
  ).pipe(map(() => mapErrorObject(this.emailControl.errors)));

  passwordErrorMessage$ = merge(
    this._submit.asObservable(),
    this.passwordControl.valueChanges
  ).pipe(map(() => mapErrorObject(this.passwordControl.errors)));

  submit() {
    Object.values(this.form.controls).forEach((c) => {
      c.markAsDirty();
      c.markAsTouched();
    });
    this._submit.next(null);

    const { email, password } = this.form.value;
    if (this.form.invalid || !email || !password) {
      this.snackbar.open('Login form is invalid', 'close', { duration: 3000 });
      return;
    }
    this.authenticationService
      .signIn(email, password)
      .pipe(
        catchError((error) => {
          let errorMessage = 'Sorry, login error';
          if (error instanceof FirebaseError) {
            const messageFromConfiguration =
              this.configService?.SERVER_ERRORS?.[error.code];
            errorMessage = messageFromConfiguration
              ? messageFromConfiguration
              : errorMessage;
          }
          this.snackbarService.errorSnackbar(errorMessage, 'Close');
          return EMPTY;
        })
      )
      .subscribe((user) => {
        if (!user) {
          return;
        }
        this.clearForm();
        this.router.navigateByUrl('/dashboard');
      });
  }
  clearForm() {
    this.form.reset();
    this.form.updateValueAndValidity();
    Object.values(this.form.controls).forEach((c) => {
      c.reset();
      c.updateValueAndValidity();
    });
  }
}

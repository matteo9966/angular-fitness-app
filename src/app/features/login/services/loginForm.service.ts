import { Injectable, inject } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { map, Subject, merge } from 'rxjs';
import { mapErrorObject } from 'src/app/core/utils/formsErrorMap';
@Injectable()
export class LoginFormService {
  fb = inject(FormBuilder);
  private _submit = new Subject();
  form = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required]),
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
    this._submit.next(null);
    const value = this.form.value;
    console.log(this.form);
    console.log(value);
  }
}

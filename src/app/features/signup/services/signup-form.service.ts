import { Injectable, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { map, Observable, Subject, merge } from 'rxjs';
import { mapErrorObject } from 'src/app/core/utils/formsErrorMap';
/**
 * All the business logic goes inside here!
 */
@Injectable()
export class SignupFormService {
  fb = inject(FormBuilder);
  private _submit = new Subject();
  form: FormGroup;
  passwordErrorMessage$!: Observable<string>;
  constructor() {
    this.form = this.createForm();
    this.form.valueChanges.subscribe((changes) => {});
    this.onSubmit = this.onSubmit.bind(this);

    this.passwordErrorMessage$ = merge(
      this._submit.asObservable(),
      this.passwordControl.valueChanges
    ).pipe(map(() => mapErrorObject(this.passwordControl.errors)));
  }

  createForm() {
    return this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(6)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
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
      this._submit.asObservable(),
      this.nameControl.valueChanges
    ).pipe(map(() => mapErrorObject(this.nameControl.errors)));
  }

  get emailErrorMessage$() {
    return merge(
      this._submit.asObservable(),
      this.emailControl.valueChanges
    ).pipe(map(() => mapErrorObject(this.emailControl.errors)));
  }

  onSubmit() {
    this._submit.next(null);
  }
}


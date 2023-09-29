import { Component, inject, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatFormFieldModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    // {
    //   provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    //   useValue: { appearance: 'outline' },
    // },
  ],
})
export class AppComponent {
  constructor(/* @Inject(MAT_FORM_FIELD_DEFAULT_OPTIONS) private matFormField:MatFormFieldDefaultOptions */) {
    // this.matFormField.appearance='outline';
  }
  title = 'angular-fitness';
}

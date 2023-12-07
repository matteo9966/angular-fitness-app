import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  OnDestroy,
  signal,
  ViewChild,
  inject,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, NgForm } from '@angular/forms';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { deepEqual } from 'src/app/core/utils/deepEqual';
import { RequiredCheckbox } from 'src/app/core/validators/requiredCheckbox.validator';
import { VALIDATION_MESSAGES } from 'src/app/core/tokens/ValidationMessages.injectionToken';
import { ValidatePipe } from 'src/app/shared/pipes/validate.pipe';
import { CrossFieldValidator } from 'src/app/core/validators/crossFieldValue.validator';
import { MatButtonModule } from '@angular/material/button';
import { TemplateFormErrorComponent } from 'src/app/shared/components/template-form-error/template-form-error.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProfanityValidator } from 'src/app/core/validators/profanity.validator';
import { StatusChangesPipe } from 'src/app/shared/pages/status-change/status-changes.pipe';
type ReviewForm = Partial<{
  email: string;
  name: string;
  nation: string;
  description: string;
  reason: string;
  privacyAndMarketing: {
    privacy: boolean;
    marketing: boolean;
    contact: boolean;
    announcements: boolean;
    updates: boolean;
  };
}>;

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    RequiredCheckbox,
    ValidatePipe,
    CrossFieldValidator,
    MatButtonModule,
    TemplateFormErrorComponent,
    MatTooltipModule,
    ProfanityValidator,
    StatusChangesPipe
  ],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: VALIDATION_MESSAGES,
      multi: true,
      useValue: {
        crossField: ([field1, field2]: [string, string]) => {
          if (!field1 || !field2) {
            return 'Invalid field';
          } else {
            return `${field1} and ${field2} do not correspond!`;
          }
        },
        validateCheckboxes: (requiredfields: string) =>
          requiredfields + ' checkbox is required',
        required: () => 'Field is required',
        email: () => 'Invalid email format',
        minlength: (value: any) => {
          console.log(value);
          return `Insert at least ${value?.requiredLength} letters!`;
        },
        profanity: (profanities: string[]) =>
          profanities?.reduce(
            (message, cur) => message + ` ${cur}`,
            'These words are not allowed:'
          ),
      },
    },
  ],
  /*   providers: [
    {
      provide: VALIDATION_MESSAGES,
      multi: true,
      useValue: {
        validateCheckboxes: (requiredfields: string) =>
          requiredfields + ' checkbox is required',
        required: () => 'Field is required',
      },
    },
  ], */
})
export class ReviewFormComponent implements AfterViewInit, OnDestroy {
  ngOnDestroy(): void {
    this.destroy$$.next(null);
  }
  touchedForm = false;

  constructor() {}
  @ViewChild('form') ngForm!: NgForm;

  private destroy$$ = new Subject();
  readonly formValue = signal<ReviewForm>({});
  readonly formDirty = signal<Boolean>(false);
  readonly formTouched = signal<Boolean>(false);
  private readonly _viewModel = computed(() => ({
    review: this.formValue(),
    formDirty: this.formDirty(),
    formTouched: this.formTouched(),
  }));
  confirmEmailvalue = '';

  ngAfterViewInit(): void {
    this.ngForm.valueChanges
      ?.pipe(takeUntil(this.destroy$$), distinctUntilChanged(deepEqual))
      .subscribe((value) => {
        this.formValue.set(value);
        this.formDirty.set(this.ngForm.form.dirty);
        this.formTouched.set(this.ngForm.form.touched);
      });
  }

  get vm() {
    return this._viewModel();
  }

  submit() {
    this.ngForm.form.markAllAsTouched();
    this.ngForm.form.markAsDirty();
    console.log(this.ngForm);
  }

  checkboxes = [
    {
      label: 'Announcements',
      description: 'You will recieve important announcements when needed',
      name: 'announcements',
    },
    {
      label: 'Updates',
      description: 'Recieve updates!No spam.',
      name: 'updates',
    },
    {
      label: 'Privacy',
      description: 'Selecting this checkbox you confirm...',
      name: 'privacy',
    },
    {
      label: 'Marketing',
      description: 'Allow us to contact you for marketing purposes',
      name: 'marketing',
    },
    {
      label: 'Contact',
      description: 'allow us to contact you whenever we want!',
      name: 'contact',
    },
  ] as const;

  contactReasons = [
    { description: 'I just want to say thank you!', value: 'thank-you' },
    { description: "I don't like your product", value: 'user-not-happy' },
    { description: 'I want to work with you', value: 'user-wants-to-join' },
    {
      description: 'I want to contact the CEO for business opportunities',
      value: 'ceo-contact',
    },
  ];

  log(form: any) {
    console.log(form);
  }
}

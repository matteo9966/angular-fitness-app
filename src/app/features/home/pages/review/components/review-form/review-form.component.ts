import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  OnDestroy,
  signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

type ReviewForm = Partial<{
  email: string;
  name: string;
  nation: string;
  description: string;
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
  ],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewFormComponent implements AfterViewInit, OnDestroy {
  ngOnDestroy(): void {
    this.destroy$$.next(null);
  }
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

  ngAfterViewInit(): void {
    this.ngForm.valueChanges
      ?.pipe(takeUntil(this.destroy$$))
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
    console.log(this.formValue());
    console.log(this.ngForm)
  }
}

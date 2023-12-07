import {
  Validator,
  NG_ASYNC_VALIDATORS,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Directive, inject } from '@angular/core';
import { ReviewFormService } from 'src/app/features/home/services/review-form.service';
import { map, of, catchError } from 'rxjs';
export function profanity(
  reviewFormServiceInstance: ReviewFormService | null
): ValidatorFn {
  return (control: AbstractControl) => {
    if (!reviewFormServiceInstance) {
      //make the service optional
      return of(null);
    }
    return reviewFormServiceInstance.checkProfanities(control.value).pipe(
      map((response) => {
        if (response.bad_words_total == 0) {
          return null;
        }
        return {
          profanity: response.bad_words_list.map((words) => words.word),
        };
      }),
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    );
  };
}

@Directive({
  selector: '[profanity]',
  standalone: true,
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      multi: true,
      useExisting: ProfanityValidator,
    },
  ],
})
export class ProfanityValidator implements Validator {
  reviewService = inject(ReviewFormService, { optional: true });
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
      console.log("Review service: ",this.reviewService);
    return profanity(this.reviewService)(control);
  }

  //   registerOnValidatorChange?(fn: () => void): void {}
}

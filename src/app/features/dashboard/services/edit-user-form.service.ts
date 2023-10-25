import { Injectable, inject, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './User.service';
import type { SocialMediaFormGroupType } from 'src/app/core/models/SocialMediaFormGroup.interface';
import {
  Subject,
  debounce,
  debounceTime,
  map,
  takeUntil,
  combineLatest,
  shareReplay,
  take,
  switchMap,
  fromEvent,
  tap,
  BehaviorSubject,
  EMPTY,
  finalize,
  catchError,
} from 'rxjs';
import { IUser } from 'src/app/core/models/User/IUser.interface';
import { SnackbarService } from 'src/app/core/services/Snackbar.service';
import { isPrimitive } from 'src/app/core/utils/isPrimitive';
@Injectable()
export class EditUserFormService implements OnDestroy {
  filterKeys = {
    name: true,
    bio: true,
    status: true,
    gender: true,
    socials: true,
  };
  fb = inject(FormBuilder);
  user = inject(UserService);
  snackBarService = inject(SnackbarService);
  private destroy$ = new Subject();
  form = this.fb.group({
    name: this.fb.control('', [Validators.required]),
    bio: this.fb.control(''),
    status: this.fb.control(''),
    gender: this.fb.control(''),
    socials: this.fb.array<FormGroup<{}>>([]),

    // backgroundImg: this.fb.control(''),
    // profileImg: this.fb.control(''),
  });
  constructor() {
    const userEditableData$ = this.user.userData$.pipe(
      takeUntil(this.destroy$),
      map((data) => {
        if (!data) return {};
        return Object.entries(data).reduce<Partial<IUser>>(
          (prev, [key, value]) => {
            if (
              Object.hasOwn(this.filterKeys, key) &&
              !!value &&
              isPrimitive(value)
            ) {
              prev[key as keyof IUser] = value;
            } else if (Object.hasOwn(this.filterKeys, key) && !!value) {
              //not primitive
              //handle socials
              switch (key) {
                case 'socials':
                  this.clearFormArray(this.form.controls.socials);
                  this.populateSocialArray(
                    this.mapSocialsFromServer(data['socials']),
                    this.form.controls.socials
                  );
                  break;
                default:
                  break;
              }
            }
            return prev;
          },
          {}
        );
      }),
      shareReplay(1)
    );
    userEditableData$.subscribe((data) => {
      this.form.patchValue(data);
    });
  }

  submitted = false;
  submitForm() {
    if (this.form.invalid || this.submitted) {
      return; //show the toaster
    }
    this.submitted = true;
    this.user.userData$
      .pipe(
        take(1),
        switchMap((data) => {
          if (!data) {
            return EMPTY;
          }
          const patchObject = this.getDiffValues(data, this.form);

          console.log(patchObject);

          // return EMPTY;

          return this.user
            .udateUserDocument(patchObject)
            .pipe(map(() => patchObject));
        }),
        finalize(() => (this.submitted = false))
      )
      .subscribe({
        next: (value) => {
          this.snackBarService.successSnackbar(
            'Personal data updated successfully',
            'close'
          );
          this.user.patchUserData((user) => {
            const freshUser: IUser = {
              name: '',
              birthdate: '',
              gender: 'M',
              profileImg: '',
              id: '',
              email: '',
              bio: '',
              status: '',
              backgroundImg: '',
              socials: [],
              bodyStats: {
                height: 0,
                weight: 0,
              },
            };
            return {
              ...freshUser,
              ...user,
              ...value,
            };
          });
        },
        error: () => {
          this.snackBarService.errorSnackbar(
            'Error while updating personal data',
            'close'
          );
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  /**
   * @description pass current store data, pass form Group, use the filter keys to get a patch object to update the user
   * @param data
   * @param form
   * @returns
   */
  getDiffValues(data: IUser, form: typeof this.form) {
    const formValue = form.value;
    const result: Record<string, any> = {};
    for (let key of Object.keys(this.filterKeys)) {
      const entry = key as keyof typeof formValue;
      if (
        formValue?.[entry] !== data?.[entry] &&
        !Array.isArray(formValue?.[entry])
      ) {
        result[entry] = formValue[entry];
      } else if (Array.isArray(formValue?.[entry])) {
        result[entry] = formValue[entry];
      }
    }
    return result as Partial<IUser>;
  }

  /**
   * @description returns a formgroup array to pass to the formArray
   * @param socials
   */
  mapSocialsFromServer(socials: IUser['socials']) {
    if (!socials) return [];
    const groups: SocialMediaFormGroupType[] = socials.map((social) => {
      return this.fb.group({
        name: this.fb.control(social.name || ''),
        url: this.fb.control(social.url || ''),
      });
    });

    return groups;
  }

  private clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  };

  private populateSocialArray(socials: FormGroup[], array: FormArray) {
    socials.forEach((social) => array.push(social));
  }
}

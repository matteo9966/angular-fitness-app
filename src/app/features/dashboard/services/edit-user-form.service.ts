import {
  Injectable,
  inject,
  OnDestroy,
  Injector,
  computed,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from './User.service';
import type { SocialMediaFormGroupType } from 'src/app/core/models/SocialMediaFormGroup.interface';
import {
  Subject,
  debounceTime,
  map,
  takeUntil,
  shareReplay,
  take,
  switchMap,
  EMPTY,
  finalize,
  catchError,
  of,
  tap,
  Observable,
} from 'rxjs';
import { IUser } from 'src/app/core/models/User/IUser.interface';
import { SnackbarService } from 'src/app/core/services/Snackbar.service';
import { isPrimitive } from 'src/app/core/utils/isPrimitive';
import { FileUploadService } from 'src/app/core/services/FileUpload.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { getDiffValues } from '../utils/getDiffValues';
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
  userService = inject(UserService);
  snackBarService = inject(SnackbarService);
  fileUploadService = inject(FileUploadService);
  injector = inject(Injector);
  private destroy$ = new Subject();
  form = this.fb.group({
    name: this.fb.control('', [Validators.required]),
    bio: this.fb.control(''),
    status: this.fb.control(''),
    gender: this.fb.control(''),
    socials: this.fb.array<FormGroup<{}>>([]),
  });

  currentUserBgImage = computed(() => this.userService.user()?.backgroundImg);
  currentUserProfileImage = computed(() => this.userService.user()?.profileImg);

  constructor() {
    this.getUserEditableData().subscribe((data) => {
      this.form.patchValue(data);
    });
  }

  getUserEditableData() {
    return toObservable(this.userService.user).pipe(
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
  }

  submitted = false;

  patchUserState(key: keyof IUser, value: any) {
    this.userService.patchUserData((user) => {
      if (!user) return null;
      user[key] = value;
      return user;
    });
  }

  submitForm() {
    if (this.form.invalid || this.submitted) {
      return; //show the toaster
    }
    this.submitted = true;
    toObservable(this.userService.user, { injector: this.injector })
      .pipe(
        take(1),
        switchMap((data) => {
          if (!data) {
            return EMPTY;
          }
          const patchObject = this.getDiffValues(data, this.form);

          console.log(patchObject);

          // return EMPTY;

          return this.userService
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
          this.userService.patchUserData((user) => {
            const freshUser: IUser = {
              name: '',
              birthdate: '',
              gender: 'other',
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

  getDiffValues(data: IUser, form: typeof this.form) {
    return getDiffValues(data, form, this.filterKeys);
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

  uploadBackgroundImage(file: File | undefined) {
    this.uploadFile(file)
      .pipe(this.updateUserImagesOperator('backgroundImg'))
      .subscribe(() => {
        this.snackBarService.successSnackbar(
          'Background image updated succesfully',
          'close'
        );
      });
  }

  updateProfileImage(file: File | undefined) {
    this.uploadFile(file)
      .pipe(this.updateUserImagesOperator('profileImg'))
      .subscribe(() => {
        this.snackBarService.successSnackbar(
          'Profile image updated succesfully',
          'close'
        );
      });
  }

  private updateUserImagesOperator(
    keyToUpdate: 'backgroundImg' | 'profileImg'
  ) {
    return (pathObs: Observable<string>) => {
      return pathObs.pipe(
        switchMap((imageUrl) => {
          return this.userService
            .udateUserDocument({
              [keyToUpdate]: imageUrl,
            })
            .pipe(map(() => imageUrl));
        }),
        // TODO: delete previous background image when updating!!
        tap((downloadUrl) => {
          this.userService.patchUserData((user) => {
            if (!user || !downloadUrl) return user;
            user[keyToUpdate] = downloadUrl;
            return user;
          });
        })
      );
    };
  }

  private uploadFile(file: File | undefined) {
    function isImageType(file: File) {
      const mimeType = file.type;
      return /^image\/.*$/.test(mimeType);
    }

    if (!file) return EMPTY;

    if (!isImageType(file)) {
      return EMPTY;
    }

    return this.fileUploadService.uploadFile(file, 'images/' + file.name).pipe(
      debounceTime(200),
      switchMap((data) => {
        if (!data.downloadUrl) {
          return EMPTY;
        } else {
          return of(data.downloadUrl);
        }
      }),
      catchError((error) => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  deleteSocialMedia(index: number) {
    this.form.controls.socials.removeAt(index);
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

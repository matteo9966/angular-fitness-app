import { Injectable, inject, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from './User.service';
import { Subject, debounce, debounceTime, map, takeUntil,combineLatest, shareReplay } from 'rxjs';
import { IUser } from 'src/app/core/models/User/IUser.interface';
@Injectable()
export class EditUserFormService implements OnDestroy {
  fb = inject(FormBuilder);
  user = inject(UserService);
  private destroy$ = new Subject();
  form = this.fb.group({
    name: this.fb.control('',[Validators.required]),
    bio: this.fb.control(''),
    status: this.fb.control(''),
    // backgroundImg: this.fb.control(''),
    // profileImg: this.fb.control(''),
  });
  constructor() {
    const filterKeys = { name: true, bio: true, status: true };
    const userEditableData$ =  this.user.userData$.pipe(
      takeUntil(this.destroy$),
      map((data) => {
        if (!data) return {};
        return Object.entries(data).reduce<Partial<IUser>>(
          (prev, [key, value]) => {
            if (Object.hasOwn(filterKeys, key) && !!value) {
              prev[key as keyof IUser] = value;
            }
            return prev;
          },
          {}
        );
      }),
      shareReplay(1)
      )
      userEditableData$.subscribe(data=>{
        this.form.patchValue(data);
      });

     const valueChanges$ = this.form.valueChanges.pipe(debounceTime(300));
     combineLatest([valueChanges$,userEditableData$]).subscribe(([formValue,userData])=>{
      console.log({formValue,userData})
     })

  }

  submitForm(){
    console.log(this.form);
    if(this.form.invalid){
      return //show the toaster
    }

  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}

import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { IUser } from 'src/app/core/models/User/IUser.interface';
/**
 * @description pass current store data, pass form Group, use the filter keys to get a patch object to update the user
 * @param data
 * @param form
 * @returns
 */
export function getDiffValues<
  T extends FormGroup<
    {
      [k in keyof Pick<
        IUser,
        'name' | 'bio' | 'gender' | 'status'
      >]: FormControl;
    } & { socials: FormArray }
  >
>(data: IUser, form: T, filterKeys: Record<string, boolean>) {
  const formValue = form.value;
  const result: Record<string, any> = {};
  for (let key of Object.keys(filterKeys)) {
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

import { FormControl, FormGroup } from '@angular/forms';

export type SocialMediaFormGroupType = FormGroup<{
  name: FormControl<string|null>;
  url: FormControl<string|null>;
}>;

import { Pipe, PipeTransform } from '@angular/core';
import { ISocial } from 'src/app/core/models/ISocial.interface';
import { IUser } from 'src/app/core/models/User/IUser.interface';
@Pipe({
  name: 'socialImage',
  standalone: true,
  pure: true,
})
export class SocialImagePipe implements PipeTransform {
  transform(
    value: IUser['socials'][0],
    socialConfig: ISocial[]
  ): string | null {
    const socialsMap = socialConfig.reduce((map, cur) => {
      (<any>map)[cur.name] = cur.iconUrl;
      return map;
    }, {});
    const iconUrl = (<any>socialsMap)[value.name] || null;

    return iconUrl;
  }
}

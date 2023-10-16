import {Injectable} from '@angular/core';

@Injectable()
export class ToolbarService {
  menuopen = false;
    links = [
        {
          label: 'About us',
          routerLink: ['no_'],
        },
        {
          label: 'Contuct us',
          routerLink: ['no_'],
        },
        {
          label: 'Pricing',
          routerLink: ['no_'],
        },
        { label: 'Blogs', routerLink: ['blog'] },
      ];
}
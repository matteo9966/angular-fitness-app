import {Injectable} from '@angular/core';
import { ROUTES } from 'src/app/core/shared/app-routes';
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
          routerLink: [ROUTES.home.children.review.absolute],
        },
        {
          label: 'Pricing',
          routerLink: ['no_'],
        },
        { label: 'Blogs', routerLink: ['blog'] },
      ];
}
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  HostListener,
} from '@angular/core';
import { AsyncPipe, CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ResponsiveLayoutService } from 'src/app/core/services/responsive-layout.service';
import { BehaviorSubject, debounceTime, tap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { AppLogoComponent } from 'src/app/shared/components/app-logo/app-logo.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarService } from '../../services/toolbar.service';
import { MobileToolbarLinksComponent } from '../mobile-toolbar-links/mobile-toolbar-links.component';
@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    AsyncPipe,
    NgClass,
    NgIf,
    RouterLink,
    AppLogoComponent,
    MatButtonModule,
    MatIconModule,
    NgFor,
    MobileToolbarLinksComponent
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  //for mobile devices this is the flag to show or hide the menu
  responsiveService = inject(ResponsiveLayoutService);
  toolbarService = inject(ToolbarService);
  private scolledY$ = new BehaviorSubject(false);
  @HostListener('window:scroll')
  onScroll() {
    this.scolledY$.next(window.scrollY > 0);
  }

  links = this.toolbarService.links;

  get isSmallDevice$() {
    return this.responsiveService.isSmallDevice$;
  }
  set menuopen(open){
    this.toolbarService.menuopen=open;
  }
  get menuopen(){
    return this.toolbarService.menuopen
  }

  scrolled$ = this.scolledY$.asObservable().pipe(debounceTime(200));
}

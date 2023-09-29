import { ChangeDetectionStrategy, Component,inject,HostListener } from '@angular/core';
import { AsyncPipe, CommonModule, NgClass, NgIf } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ResponsiveLayoutService } from 'src/app/core/services/responsive-layout.service';
import { BehaviorSubject, debounceTime,tap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { AppLogoComponent } from 'src/app/shared/components/app-logo/app-logo.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule,AsyncPipe,NgClass,NgIf,RouterLink,AppLogoComponent,MatButtonModule,MatIconModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  responsiveService = inject(ResponsiveLayoutService);
  menuopen=false; //for mobile devices this is the flag to show or hide the menu
  private scolledY$ = new BehaviorSubject(false);
  @HostListener('window:scroll')
  onScroll(){
     this.scolledY$.next(window.scrollY>0)
  }

  


  get isSmallDevice$(){
    return this.responsiveService.isSmallDevice$;
  }

  scrolled$  = this.scolledY$.asObservable().pipe(debounceTime(200))
  

}

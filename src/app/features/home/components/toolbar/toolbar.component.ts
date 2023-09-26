import { ChangeDetectionStrategy, Component,inject,HostListener } from '@angular/core';
import { AsyncPipe, CommonModule, NgClass, NgIf } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ResponsiveLayoutService } from 'src/app/core/services/responsive-layout.service';
import { BehaviorSubject, debounceTime,tap } from 'rxjs';
@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule,AsyncPipe,NgClass,NgIf],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  responsiveService = inject(ResponsiveLayoutService);
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

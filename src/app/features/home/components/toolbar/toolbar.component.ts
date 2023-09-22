import { ChangeDetectionStrategy, Component,inject } from '@angular/core';
import { AsyncPipe, CommonModule, NgClass, NgIf } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ResponsiveLayoutService } from 'src/app/core/services/responsive-layout.service';
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

  get isSmallDevice$(){
    return this.responsiveService.isSmallDevice$;
  }
}

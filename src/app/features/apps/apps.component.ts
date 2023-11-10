import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetContainerComponent } from 'src/app/shared/components/widget-container/widget-container.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-apps',
  standalone: true,
  imports: [CommonModule,WidgetContainerComponent,RouterOutlet],
  templateUrl: './apps.component.html',
  styleUrl: './apps.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppsComponent {

}

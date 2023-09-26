import { ChangeDetectionStrategy, Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-image-card',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageCardComponent {
 @Input({required:true}) imageUrl!:string;
 @Input({required:true}) title!:string;
 @Input({required:true}) actionLabel!:string;
 @Input({required:true}) actionLink!:string;
}

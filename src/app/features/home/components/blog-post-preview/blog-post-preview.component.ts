import { ChangeDetectionStrategy, Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMobileClassDirective } from 'src/app/shared/directives/add-mobile-class.directive';
import {MatCardModule} from '@angular/material/card';
import { IBlogPreview } from 'src/app/core/models/IBlogPreviews.interface';
@Component({
  selector: 'app-blog-post-preview',
  standalone: true,
  imports: [CommonModule,AddMobileClassDirective,MatCardModule],
  templateUrl: './blog-post-preview.component.html',
  styleUrls: ['./blog-post-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPostPreviewComponent {
  @Input() blogPreview!:IBlogPreview;
}

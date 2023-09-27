import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-post-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-post-preview.component.html',
  styleUrls: ['./blog-post-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPostPreviewComponent {

}

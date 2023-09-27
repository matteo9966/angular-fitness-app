import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPostPreviewComponent } from '../../components/blog-post-preview/blog-post-preview.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule,BlogPostPreviewComponent],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogComponent {

}

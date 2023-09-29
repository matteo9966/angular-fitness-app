import { ChangeDetectionStrategy, Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPostPreviewComponent } from '../../components/blog-post-preview/blog-post-preview.component';
import { IBlogPreview } from 'src/app/core/models/IBlogPreviews.interface';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule,BlogPostPreviewComponent],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogComponent {
  @Input() blogPostPreviews:IBlogPreview[]=[]

}

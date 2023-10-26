import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ResponsiveLayoutService } from 'src/app/core/services/responsive-layout.service';
import { PictureUploadService } from './picture-upload.service';

@Component({
  selector: 'app-picture-upload',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './picture-upload.component.html',
  styleUrls: ['./picture-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PictureUploadService],
})
export class PictureUploadComponent {
  isMobile$ = inject(ResponsiveLayoutService).isSmallDevice$;
  pictureUploadService = inject(PictureUploadService);
  @Output() pictureChange = this.pictureUploadService.fileChange;
  // onChangePicture = this.pictureUploadService.onChangeUploadFile;

  public onChangePicture(e: Event) {
    const file = (<HTMLInputElement>e.target).files?.[0];
    if (!file) {
      return;
    }
    this.pictureChange.emit(file);
  }

}

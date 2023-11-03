import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Output,
  ViewChild,
  ElementRef,
  Input,
  computed,
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
  imageUrl = this.pictureUploadService.imageUrl;
  private _currentImageUrl: string | null = null;
  disableSaveButton = computed(() => {
    return (
      !this.imageUrl() ||
      this._currentImageUrl == this.imageUrl()
    );
  });
  fileSelected = false;
  file: File | null = null;
  @Output() fileSave = this.pictureUploadService.fileSave;
  @Output() pictureUploaded = this.pictureUploadService.pictureUploaded;
  @Input({ required: true })
  set currentImageURL(url: string) {
    this.imageUrl.set(url);
    this._currentImageUrl = url;
  }

  @Input({ required: true }) pictureName!: string;
  @ViewChild('image') image!: ElementRef<HTMLImageElement>;

  public onChangePicture(e: Event) {
    const file = (<HTMLInputElement>e.target).files?.[0];
    if (!file) {
      return;
    }
    if (file.type.includes('image')) {
      const objectUrl = URL.createObjectURL(file);
      this.imageUrl.set(objectUrl);
      this.fileSelected = true;
      this.file = file;
    }
  }

  deleteSelectedImage() {
    this.fileSave.emit(null);
    this.fileSelected = false;
    this.imageUrl.set(this._currentImageUrl);
  }

  /**
   * @description method called when clicking on save
   * @returns
   */
  uploadImage() {
    if (!this.fileSelected || !this.file) return;
    this.fileSave.emit(this.file);
  }
}

import { Injectable, EventEmitter, inject, signal } from '@angular/core';
import { FileUploadService } from 'src/app/core/services/FileUpload.service';
import { UserService } from 'src/app/features/dashboard/services/User.service';
@Injectable()
export class PictureUploadService {
  public fileSave = new EventEmitter<File | undefined | null>();

  fileUploadService = inject(FileUploadService);
  userService = inject(UserService);
  imageUrl = signal<string | null>(null); // 1 src of truth
  fileSelected = signal(false);
  pictureUploaded = new EventEmitter();

  uploadFile(file: File, name: string) {
    this.fileUploadService.uploadFile(file, name).subscribe((data) => {
      if (data.downloadUrl) {
        console.log('image updated')
        this.imageUrl.set(data.downloadUrl);
        this.pictureUploaded.emit(data.downloadUrl);
        //update the user with the new url
      }else{
        console.log('error while uploading!')
        //show toastr
      }
    });
  }

}

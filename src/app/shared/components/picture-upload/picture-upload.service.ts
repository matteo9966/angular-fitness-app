import { Injectable, EventEmitter } from '@angular/core';
@Injectable()
export class PictureUploadService {
  public fileChange = new EventEmitter<File | undefined>();


}

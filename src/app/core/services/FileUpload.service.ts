import { Injectable, inject } from '@angular/core';
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from '@angular/fire/storage';
import { defer, EMPTY, Observable } from 'rxjs';
@Injectable()
export class FileUploadService {
 private storage = inject(Storage);
  constructor() {}

  uploadFile(file: File, fileName: string) {
    return defer(
      () =>
        new Observable<{
          progress: number;
          downloadUrl: string | null;
          paused: boolean;
          running: boolean;
        }>((observer) => {
          const storageRef = ref(this.storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              switch (snapshot.state) {
                case 'running':
                  observer.next({
                    progress,
                    downloadUrl: null,
                    running: true,
                    paused: false,
                  });
                  break;
                case 'paused':
                  observer.next({
                    progress,
                    downloadUrl: null,
                    paused: true,
                    running: false,
                  });
                  break;
              }
            },
            (error) => {
              observer.error(error); // handle the storage error!
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                observer.next({
                  downloadUrl: url,
                  paused: false,
                  progress: 100,
                  running: false,
                });
              });
            }
          );
        })
    );
  }
}

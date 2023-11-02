import { ErrorHandler, Injectable, inject, NgZone } from '@angular/core';
import { SnackbarService } from '../services/Snackbar.service';
import { CustomServerError } from './CustomServerError';
import { mapFirebaseError } from '../utils/mapFirebaseError';
import { ConfigurationService } from '../services/configuration.service';

/**
 * @description
 */
@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  snackbarService = inject(SnackbarService);
  configuration = inject(ConfigurationService);
  ngZone = inject(NgZone);
  handleError(error: any): void {
    this.ngZone.run(() => {
      if (error instanceof CustomServerError) {
          const errorMessage =
            mapFirebaseError(error.code!, this.configuration.SERVER_ERRORS || {}) ||
            'SERVER ERROR!';
          this.snackbarService.errorSnackbar(errorMessage, 'close');
        return;
      } else if (false) {
      } else {
        console.log('Centralized error handler: ', error);
      }
    });
  }
}

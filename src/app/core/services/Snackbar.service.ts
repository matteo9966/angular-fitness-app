import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  snackbarDuration = 154000;
  snackbar = inject(MatSnackBar);

  successSnackbar(message: string, actionLabel: string) {
    this.showSnackbar(message, actionLabel, 'snackbar-success-class');
  }

  errorSnackbar(message: string, actionLabel: string) {
    this.showSnackbar(message, actionLabel, 'snackbar-error-class');
  }

  private showSnackbar(
    message: string,
    actionLabel: string,
    panelClass: string
  ) {
    this.snackbar.open(message, actionLabel, {
      duration: this.snackbarDuration,
      panelClass: panelClass,
    });
  }
}

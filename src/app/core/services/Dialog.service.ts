import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Component, Injectable, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from 'src/app/shared/components/spinner-component/spinner-component.component';

@Injectable({ providedIn: 'root' })
export class DialogService {
  dialog = inject(MatDialog);

  showSpinner() {
    this.dialog.open(SpinnerComponent, {
      closeOnNavigation: true,
      disableClose: true,
      backdropClass:'backdrop-class'
    });
  }

  hideDialog() {
    this.dialog.closeAll();
  }
}

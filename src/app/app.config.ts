import {
  ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import {
  connectFirestoreEmulator,
  getFirestore,
  provideFirestore,
} from '@angular/fire/firestore';
import {
  connectStorageEmulator,
  getStorage,
  provideStorage,
} from '@angular/fire/storage';
// import {
//   connectFunctionsEmulator,
//   getFunctions,
//   provideFunctions,
// } from '@angular/fire/functions';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AuthenticationService } from './core/services/Authentication.service';
import { provideHttpClient } from '@angular/common/http';
import { CustomErrorHandler } from './core/errors/CustomErrorHandler';
export const appConfig: ApplicationConfig = {
  providers: [
    AuthenticationService,
    { provide: ErrorHandler, useClass: CustomErrorHandler },
    provideHttpClient(),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    importProvidersFrom(MatDialogModule),
    importProvidersFrom(MatProgressSpinner),
    importProvidersFrom(MatSnackBarModule), // globally have a snackbar
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideAuth(() => {
        const auth = getAuth();
        if (location.hostname === 'localhost') {
          connectAuthEmulator(auth, 'http://127.0.0.1:9099', {
            disableWarnings: true,
          });
        }
        return auth;
      }),
      provideFirestore(() => {
        const firestore = getFirestore();
        if (location.hostname === 'localhost') {
          connectFirestoreEmulator(firestore, '127.0.0.1', 8081);
        }
        return firestore;
      }),

      provideStorage(() => {
        const storage = getStorage();
        if (location.hostname === 'localhost') {
          connectStorageEmulator(storage, '127.0.0.1', 9199);
        }
        return storage;
      })
    ),
  ],
};

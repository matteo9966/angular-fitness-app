import { ApplicationConfig, importProvidersFrom } from '@angular/core';
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
import {
  connectFunctionsEmulator,
  getFunctions,
  provideFunctions,
} from '@angular/fire/functions';
import { MatSnackBarModule} from '@angular/material/snack-bar';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
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
      provideFunctions(() => {
        const functions = getFunctions();
        if (location.hostname === 'localhost') {
          connectFunctionsEmulator(functions, '127.0.0.1', 5001);
        }
        return functions;
      }),
      provideStorage(() => {
        const storage = getStorage();
        if (location.hostname === 'localhost') {
          connectStorageEmulator(storage, '127.0.0.1', 5001);
        }
        return storage;
      })
    ),
  ],
};

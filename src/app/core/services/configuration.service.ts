import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, OnDestroy, inject } from '@angular/core';
import { ISocial } from '../models/ISocial.interface';
import { Subject, takeUntil, catchError, EMPTY } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ConfigurationService implements OnDestroy {
  ngOnDestroy(): void {
    this.destroy$.next('');
  }
  SOCIALS_CONFIG: ISocial[] = []; // the list of options for the select element
  SERVER_ERRORS: Record<string, string> | null = null;
  SOCIALS_CONFIG_URL = '/assets/config/socials-list.json';
  SERVER_ERRORS_MAP_URL = '/assets/config/server-errors-map.json'; // key value pair of errors for firebase;
  private http = inject(HttpClient);
  private destroy$ = new Subject();

  loadSocials() {
    if (this.SOCIALS_CONFIG.length) {
      return; //already loaded socials
    }
    this.http
      .get<ISocial[]>(this.SOCIALS_CONFIG_URL)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          console.log('Social media error:', error);
          return EMPTY;
        })
      )
      .subscribe((socials) => {
        this.SOCIALS_CONFIG = socials;
      });
  }

  loadServerErrors() {
    if (this.SERVER_ERRORS) {
      return;
    }
    this.http
      .get<Record<string, string>>(this.SERVER_ERRORS_MAP_URL)
      .pipe(
        takeUntil(this.destroy$),
        catchError(() => {
          console.log('Error while fetching server errors');
          return EMPTY;
        })
      )
      .subscribe((errors) => {
        this.SERVER_ERRORS = errors;
      });
  }

  loadAllConfigurations() {
    this.loadSocials();
    this.loadServerErrors();
  }
}

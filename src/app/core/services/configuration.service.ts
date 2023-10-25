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
  SOCIALS_CONFIG_URL = '/assets/config/socials-list.json';
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

  loadAllConfigurations() {
    this.loadSocials();
  }
}

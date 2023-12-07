import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Profanity } from 'src/app/core/models/API/ContactUs/Profanity.response';
@Injectable()
export class ReviewFormService {
  #httpClient = inject(HttpClient);

  checkProfanities(text: string) {
    const headers = new HttpHeaders({
      apikey: environment.profanity.profanityAPIKey,
    });
    return this.#httpClient.post<Profanity>(environment.profanity.APIURL, text, {
      headers,
    });
  }
}

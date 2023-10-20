import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WindowEventsService {

  constructor() { }

  beforeUnload$(){
    return fromEvent(window, 'beforeunload')
  }

}

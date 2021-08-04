import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorsService {
  networkErrors$ = new Subject();
  errorLocation$ = new Subject();

  constructor() {}

  setNetworkErrors$(errors: any) {
    this.networkErrors$.next(errors);
  }
  setErrorLocation$(errorsLocation: any) {
    this.errorLocation$.next(errorsLocation);
  }
}

import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {

  private isSpinner$ = new Subject<boolean>();

  get state$() {
    return this.isSpinner$.asObservable();
  }

  constructor() {
  }

  show(): void {
    setTimeout(() => this.isSpinner$.next(true));
  }

  hide(): void {
    setTimeout(() => this.isSpinner$.next(false));
  }
}

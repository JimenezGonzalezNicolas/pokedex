import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  private isMobile = new BehaviorSubject<boolean>(false);
  isMobile$ = this.isMobile.asObservable();

  constructor() {
    this.checkSize();
    window.addEventListener('resize', () => this.checkSize());
  }

  private checkSize() {
    if (window.innerWidth <= 425) {
      this.isMobile.next(true);
    } else {
      this.isMobile.next(false);
    }
  }
}

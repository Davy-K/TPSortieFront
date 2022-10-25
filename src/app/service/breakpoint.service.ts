import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  private smallDevice$: Observable<boolean> = new Observable<boolean>();
  constructor(breakpointObserver: BreakpointObserver) {
    this.smallDevice$ = breakpointObserver
      .observe([
        Breakpoints.XSmall
      ]).pipe(
        switchMap(value => of(value.matches))
      );
  }
  get isSmallDevice$(): Observable<boolean> {
    return this.smallDevice$;
  }
}

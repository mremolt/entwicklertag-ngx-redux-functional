import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

export abstract class ContainerComponent implements OnDestroy {
  protected onDestroy$ = new Subject();

  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  public subscribeToObservable<T>(obs$: Observable<T>, callback: (data: T) => void) {
    obs$.pipe(takeUntil(this.onDestroy$)).subscribe(callback.bind(this));
  }
}

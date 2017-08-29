import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import {
  NgReduxTestingModule,
  MockNgRedux
} from '@angular-redux/store/testing';
import { Subject } from 'rxjs';

import { HomeComponent } from '../src/app/home/home.component';
import { HomeActions } from '../src/app/home/backend/home.actions';

describe('testing a component as class', () => {
  let subject: HomeComponent;
  let greeting$: Subject<string>;

  beforeEach(() => {
    TestBed.resetTestingModule();
    MockNgRedux.reset();

    TestBed.configureTestingModule({
      imports: [CommonModule, NgReduxTestingModule],
      providers: [HomeActions]
    });
  });

  beforeEach(() => {
    const homeActions = TestBed.get(HomeActions);
    subject = new HomeComponent(homeActions);
    greeting$ = subject.greeting$ as Subject<string>;
    subject.ngOnInit();
  });

  describe('the page', () => {
    it('is sets the greeting property', () => {
      greeting$.next('World');
      expect(subject.greeting).toEqual('World');
    });

    it('has a working observable selector', (done: any) => {
      subject.greeting$.subscribe(data => {
        expect(data).toEqual('42');
        done();
      });
      greeting$.next('42');
    });
  });
});

import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { IState } from '../backend/interfaces';
// import { fetchUser2, resetUser } from '../backend/users/users.actions';
import { denormalizedCurrentUserState } from '../backend/users/current-user.selectors';

@Component({
  selector: 'dcs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @select(denormalizedCurrentUserState) public currentUser$: Observable<any>;
  public greeting: string = 'World';

  constructor(private store: NgRedux<IState>) {}

  public ngOnInit(): void {
    // this.currentUser$.subscribe(data => {
    //   console.warn(data);
    // });
    // this.store.dispatch(fetchUser2('1'));
    // setTimeout(() => {
    //   this.store.dispatch(fetchUser2('4'));
    // }, 1000);
    // setTimeout(() => {
    //   this.store.dispatch(resetUser());
    // }, 5000);
  }
}

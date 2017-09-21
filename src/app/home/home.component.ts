import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ContainerComponent } from '@dcs/ngx-utils';

import { HomeActions } from './backend/home.actions';
import { homeGreetingSelector } from './backend/home.selectors';

@Component({
  selector: 'dcs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends ContainerComponent implements OnInit {
  @select(homeGreetingSelector) public greeting$: Observable<string>;
  public greeting: string;

  constructor(private homeActions: HomeActions) {
    super();
  }

  public ngOnInit() {
    this.valueFromObservable(this.greeting$, 'greeting');
    this.homeActions.greetWorld();
  }
}

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'dcs-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor() {
    console.log('HIER!!!!!!!!!!');
  }
}

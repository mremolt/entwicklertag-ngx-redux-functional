import { Component } from '@angular/core';

@Component({
  selector: 'dcs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor() {
    console.log('HOME!!!');
  }
}

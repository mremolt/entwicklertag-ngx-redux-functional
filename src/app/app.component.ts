import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dcs-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public ngOnInit(): void {
    console.log('Site load:', performance.now().toFixed(2), 'ms');
  }
}

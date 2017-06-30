import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.routes';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false
    }),
    BrowserModule
  ]
})
export class AppModule {}

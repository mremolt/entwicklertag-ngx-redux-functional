import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { HomeModule } from './home/home.module';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
    }),
    BrowserModule,
    // App modules
    HomeModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de' }],
})
export class AppModule {}

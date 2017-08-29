import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppTranslateModule, APP_TRANSLATIONS } from '@dcs/ngx-utils';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { translations as de } from './locale/de';
import { translations as en } from './locale/en';
import { HomeModule } from './home/home.module';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false
    }),
    BrowserModule,
    AppTranslateModule,
    // App modules
    HomeModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de' },
    {
      provide: APP_TRANSLATIONS,
      useValue: { name: 'de', translations: de },
      multi: true
    },
    {
      provide: APP_TRANSLATIONS,
      useValue: { name: 'en', translations: en },
      multi: true
    }
  ]
})
export class AppModule {}

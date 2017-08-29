import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { APP_REDUCERS, APP_EPICS, APP_TRANSLATIONS } from '@dcs/ngx-utils';

import { HomeActions } from './backend/home.actions';
import { homeReducer } from './backend/home.reducer';
import { greetDcsEpic } from './backend/home.epics';

import { HomeComponent } from './home.component';

import { translations as en } from './locale/en';
import { translations as de } from './locale/de';
import { translations } from '../locale/en';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule.forChild(routes), TranslateModule],
  providers: [
    HomeActions,
    {
      provide: APP_REDUCERS,
      useValue: { name: 'home', reducer: homeReducer },
      multi: true
    },
    { provide: APP_EPICS, useValue: greetDcsEpic, multi: true },
    {
      provide: APP_TRANSLATIONS,
      useValue: { name: 'en', translations: en },
      multi: true
    },
    {
      provide: APP_TRANSLATIONS,
      useValue: { name: 'de', translations: de },
      multi: true
    }
  ]
})
export class HomeModule {}

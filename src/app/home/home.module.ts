import { HomeActions } from './backend/home.actions';
import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { NgRedux } from '@angular-redux/store';
import {
  DynamicModule,
  RootReducer,
  RootEpic,
  ISubState,
  APP_REDUCERS,
  IReducerConfig,
  APP_EPICS,
  IAppEpic,
  APP_TRANSLATIONS
} from '@dcs/ngx-utils';

import { HomeComponent } from './home.component';
import { homeReducer } from './backend/home.reducer';
import { greetDcsEpic } from './backend/home.epics';
import { translations as en } from './locale/en';
import { translations as de } from './locale/de';

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
export class HomeModule {
  // constructor(
  //   translate: TranslateService,
  //   rootReducer: RootReducer,
  //   rootEpic: RootEpic,
  //   store: NgRedux<ISubState>,
  //   @Inject(APP_REDUCERS) appReducers: IReducerConfig[],
  //   @Inject(APP_EPICS) appEpics: IAppEpic[],
  //   @Inject(APP_TRANSLATIONS) appTranslations: any
  // ) {
  //   // super(translate, appTranslations, rootReducer, rootEpic, store, appReducers, appEpics);
  // }
}

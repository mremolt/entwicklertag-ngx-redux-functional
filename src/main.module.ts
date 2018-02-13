import { NgModule, Inject } from '@angular/core';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { HttpClientModule } from '@angular/common/http';
import {
  NgRedux,
  DevToolsExtension,
  NgReduxModule
} from '@angular-redux/store';
import {
  MainBaseModule,
  IState,
  RootReducer,
  RootEpic,
  NgxUtilsModule,
  StableService,
  APP_ENVIRONMENT,
  RestService
} from '@dcs/ngx-utils';

import Environment from './environment';
import { AppModule } from './app/app.module';
import { AppComponent } from './app/app.component';
import { AppRestService } from './app/services/app-rest-service';

export function provideEnvironment(): Environment {
  return new Environment();
}

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    HttpClientModule,
    AppModule,
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
    NgxUtilsModule
  ],
  providers: [
    StableService,
    { provide: RestService, useClass: AppRestService },
    { provide: APP_ENVIRONMENT, useFactory: provideEnvironment }
  ]
})
export class MainModule extends MainBaseModule {
  constructor(
    store: NgRedux<IState>,
    devTools: DevToolsExtension,
    rootReducer: RootReducer,
    rootEpic: RootEpic,
    ngReduxRouter: NgReduxRouter,
    stableService: StableService,
    @Inject(APP_ENVIRONMENT) environment: Environment
  ) {
    super(
      store,
      devTools,
      rootReducer,
      rootEpic,
      ngReduxRouter,
      environment,
      stableService
    );
  }
}

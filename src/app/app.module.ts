import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { setupStore } from '@dcs/redux-utils';
import { createEpicMiddleware } from 'redux-observable';

import { Environment } from '../environments/default-environment.class';
import CurrentEnvironment from '../environment';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { rootReducer } from './backend/root.reducer';
import { IState } from './backend/interfaces';
import { rootEpic } from './backend/root.epic';

const initialState = {} as any;

export function provideEnvironment(devTools: DevToolsExtension) {
  return new CurrentEnvironment(devTools);
}

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
    }),
    BrowserModule,
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
    HttpClientModule,
    // App modules
  ],
  providers: [
    { provide: Environment, useFactory: provideEnvironment, deps: [DevToolsExtension] },
    { provide: LOCALE_ID, useValue: 'de' },
  ],
})
export class AppModule {
  constructor(
    ngRedux: NgRedux<IState>,
    http: HttpClient,
    environment: Environment,
    ngReduxRouter: NgReduxRouter
  ) {
    const epicMiddleware = createEpicMiddleware(rootEpic, {
      dependencies: { http, environment },
    });

    const store = setupStore<IState>(
      rootReducer,
      initialState,
      [...environment.additionalMiddleware, epicMiddleware],
      environment.additionalEnhancers
    );

    ngRedux.provideStore(store);
    ngReduxRouter.initialize();
  }
}

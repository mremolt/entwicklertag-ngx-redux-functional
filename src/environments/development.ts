import { DevToolsExtension } from '@angular-redux/store';
import { createLogger } from 'redux-logger';
import immutableStateInvariantMiddleware from 'redux-immutable-state-invariant';

import { Environment } from './default-environment.class';

const logger = createLogger({
  collapsed: true,
  diff: true,
  duration: true,
  timestamp: true,
});

export default class DevelopmentEnvironment extends Environment {
  public apiUrl = '//localhost:3001';
  public throwOnSchemaError = false;
  public pageTitle = 'DCS Angular Starter (development)';
  public base = '/';

  constructor(devTools?: DevToolsExtension) {
    super();
    if (devTools) {
      this.additionalEnhancers = [...this.additionalEnhancers, devTools.enhancer()];
    }
    this.additionalMiddleware = [...this.additionalMiddleware, logger, immutableStateInvariantMiddleware()];
  }
}

import { Middleware } from 'redux';
import { IEnvironment, loggerMiddleware } from '@dcs/ngx-utils';

export default class DevelopmentEnvironment implements IEnvironment {
  public settings = {
    apiUrl: 'http://jsonplaceholder.typicode.com',
    throwOnSchemaError: false
  };

  public additionalMiddleware: Middleware[] = [loggerMiddleware];
}

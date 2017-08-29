import { Middleware } from 'redux';
import {
  IEnvironment,
  loggerMiddleware,
  ISettings,
  DefaultEnvironment
} from '@dcs/ngx-utils';

export default class DevelopmentEnvironment extends DefaultEnvironment
  implements IEnvironment {
  public settings = {
    apiUrl: 'http://jsonplaceholder.typicode.com',
    throwOnSchemaError: false,
    page: {
      title: 'DCS Angular Starter',
      base: '/'
    }
  };

  public additionalMiddleware: Middleware[] = [loggerMiddleware];
}

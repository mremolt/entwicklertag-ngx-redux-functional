import { Middleware, GenericStoreEnhancer } from 'redux';
import {
  IEnvironment,
  loggerMiddleware,
  persistStateEnhancer,
  DefaultEnvironment
} from '@dcs/ngx-utils';
export default class StagingEnvironment extends DefaultEnvironment
  implements IEnvironment {
  public settings = {
    apiUrl: 'http://jsonplaceholder.typicode.com',
    throwOnSchemaError: true,

    page: {
      title: 'DCS Angular Starter (staging)',
      base: '/'
    }
  };

  public additionalMiddleware: Middleware[] = [loggerMiddleware];
  public additionalEnhancers: GenericStoreEnhancer[] = [persistStateEnhancer()];
}

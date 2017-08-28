import { Middleware, GenericStoreEnhancer } from 'redux';
import {
  IEnvironment,
  loggerMiddleware,
  persistStateEnhancer
} from '@dcs/ngx-utils';
export default class StagingEnvironment implements IEnvironment {
  public settings = {
    apiUrl: 'http://jsonplaceholder.typicode.com',
    throwOnSchemaError: true
  };

  public additionalMiddleware: Middleware[] = [loggerMiddleware];
  public additionalEnhancers: GenericStoreEnhancer[] = [persistStateEnhancer()];
}

import { Middleware, GenericStoreEnhancer } from 'redux';
import {
  IEnvironment,
  loggerMiddleware,
  DefaultEnvironment
} from '@dcs/ngx-utils';
export default class StagingEnvironment extends DefaultEnvironment
  implements IEnvironment {
  public apiUrl = 'http://jsonplaceholder.typicode.com';
  public throwOnSchemaError = true;
  public pageTitle = 'DCS Angular Starter (staging)';
  public base = '/';

  public additionalMiddleware: Middleware[] = [loggerMiddleware];
  public additionalEnhancers: GenericStoreEnhancer[] = [];
}

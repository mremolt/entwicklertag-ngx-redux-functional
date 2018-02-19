import { Middleware, GenericStoreEnhancer } from 'redux';

export default class StagingEnvironment {
  public apiUrl = 'http://jsonplaceholder.typicode.com';
  public throwOnSchemaError = true;
  public pageTitle = 'DCS Angular Starter (staging)';
  public base = '/';

  public additionalMiddleware: Middleware[] = [];
  public additionalEnhancers: GenericStoreEnhancer[] = [];
}

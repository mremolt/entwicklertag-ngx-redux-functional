import { Middleware } from 'redux';

export default class DevelopmentEnvironment {
  public apiUrl = 'http://localhost:3001';
  public throwOnSchemaError = false;
  public pageTitle = 'DCS Angular Starter (development)';
  public base = '/';

  public additionalMiddleware: Middleware[] = [];
}

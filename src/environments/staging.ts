import { Environment } from './default-environment.class';

export default class StagingEnvironment extends Environment {
  public apiUrl = 'http://jsonplaceholder.typicode.com';
  public throwOnSchemaError = true;
  public pageTitle = 'DCS Angular Starter (staging)';
  public base = '/';
}

import { IAutoUpdateSettings } from '@dcs/ngx-utils';
import { Environment } from './default-environment.class';

export default class ProductionEnvironment extends Environment {
  public apiUrl = 'http://jsonplaceholder.typicode.com';
  public throwOnSchemaError = true;
  public autoUpdate: IAutoUpdateSettings = 'confirm';
  public updateMessage = 'Updates available, reload page now?';
  public pageTitle = 'DCS Angular Starter';
  public base = '/';
}

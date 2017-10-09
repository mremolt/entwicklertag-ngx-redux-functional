import { GenericStoreEnhancer } from 'redux';
import {
  IEnvironment,
  DefaultEnvironment,
  IAutoUpdateSettings
} from '@dcs/ngx-utils';
export default class ProductionEnvironment extends DefaultEnvironment
  implements IEnvironment {
  public apiUrl = 'http://jsonplaceholder.typicode.com';
  public throwOnSchemaError = true;
  public autoUpdate: IAutoUpdateSettings = 'confirm';
  public updateMessage = 'Updates available, reload page now?';
  public pageTitle = 'DCS Angular Starter';
  public base = '/';
  // public additionalEnhancers: GenericStoreEnhancer[] = [persistStateEnhancer()];
  public additionalEnhancers: GenericStoreEnhancer[] = [];
}

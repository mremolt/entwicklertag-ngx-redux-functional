import { GenericStoreEnhancer } from 'redux';
import {
  IEnvironment,
  persistStateEnhancer,
  DefaultEnvironment,
  IAutoUpdateSettings
} from '@dcs/ngx-utils';
export default class ProductionEnvironment extends DefaultEnvironment
  implements IEnvironment {
  public apiUrl = 'http://jsonplaceholder.typicode.com';
  public throwOnSchemaError = true;
  public autoUpdate: IAutoUpdateSettings = 'never';
  public updateMessage = 'Update now?';
  public pageTitle = 'DCS Angular Starter (production mode)';
  public base = '/';
  public additionalEnhancers: GenericStoreEnhancer[] = [persistStateEnhancer()];
}

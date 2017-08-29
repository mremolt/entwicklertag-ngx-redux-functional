import { GenericStoreEnhancer } from 'redux';
import {
  IEnvironment,
  persistStateEnhancer,
  DefaultEnvironment
} from '@dcs/ngx-utils';
export default class ProductionEnvironment extends DefaultEnvironment
  implements IEnvironment {
  public settings: any = {
    apiUrl: 'http://jsonplaceholder.typicode.com',
    throwOnSchemaError: true,
    autoUpdate: 'never',
    updateMessage: 'Update now?',
    page: {
      title: 'DCS Angular Starter (production mode)',
      base: '/'
    }
  };

  public additionalEnhancers: GenericStoreEnhancer[] = [persistStateEnhancer()];
}

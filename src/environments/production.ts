import { GenericStoreEnhancer } from 'redux';
import { IEnvironment, persistStateEnhancer } from '@dcs/ngx-utils';
export default class ProductionEnvironment implements IEnvironment {
  public settings = {
    apiUrl: 'http://jsonplaceholder.typicode.com',
    throwOnSchemaError: true
  };

  public additionalEnhancers: GenericStoreEnhancer[] = [persistStateEnhancer()];
}

import { GenericStoreEnhancer } from 'redux';

export default class ProductionEnvironment {
  public apiUrl = 'http://jsonplaceholder.typicode.com';
  public throwOnSchemaError = true;
  public autoUpdate = 'confirm';
  public updateMessage = 'Updates available, reload page now?';
  public pageTitle = 'DCS Angular Starter';
  public base = '/';
  // public additionalEnhancers: GenericStoreEnhancer[] = [persistStateEnhancer()];
  public additionalEnhancers: GenericStoreEnhancer[] = [];
}

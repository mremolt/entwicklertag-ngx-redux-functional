import { GenericStoreEnhancer, Middleware } from 'redux';

export type IAutoUpdateSettings = 'always' | 'confirm' | 'never';

export interface IEnvironment {
  apiUrl: string;
  apiVersion?: string;
  throwOnSchemaError: boolean;
  autoUpdate: IAutoUpdateSettings;
  updateMessage: string;
  pageTitle: string;
  base: string;
  additionalSettings: object;
  production: boolean;
  additionalMiddleware?: Middleware[];
  additionalEnhancers?: GenericStoreEnhancer[];
}

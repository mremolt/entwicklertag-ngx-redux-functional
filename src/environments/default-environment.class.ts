import { GenericStoreEnhancer, Middleware } from 'redux';
import { IEnvironment, IAutoUpdateSettings } from '@dcs/ngx-utils';

import { uuidMiddleware } from '../libs/redux-utils/src/middleware/uuid.middleware';

/**
 * Base class for Environment settings.
 *
 * Subclass this to add a real Environment to your app.
 */
export class Environment implements IEnvironment {
  public production: boolean = false;

  /**
   * Base API URL for current Environment, used by [[RestService]]
   */
  public apiUrl: string = '';
  /**
   * Thow if a given JSON Schema produces a validation error on data?
   */
  public throwOnSchemaError: boolean = true;
  /**
   * Ask user for confirmation to relaod the page after a ServiceWorker update?
   */
  public autoUpdate: IAutoUpdateSettings = 'always';
  public updateMessage: string = 'A new version of the app is available. Do you want to reload the page to update?';
  /**
   * HTML <title> tag
   */
  public pageTitle: string = 'DCS Angular Starter';
  /**
   * What to set as <base href>
   *
   * see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base
   */
  public base: string = '/';
  /**
   * Add app specific redux enhancers here.
   */
  public additionalEnhancers: GenericStoreEnhancer[] = [];
  /**
   * Add app specific middleware here.
   */
  public additionalMiddleware: Middleware[] = [uuidMiddleware];
  /**
   * Add here, whatever additional settings your app needs
   */
  public additionalSettings = {};
}

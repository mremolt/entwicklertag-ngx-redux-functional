import { RequestOptions, Headers } from '@angular/http';
import { RestService } from '@dcs/ngx-utils';

/**
 * AppRestService extends RestService and is used to override the default behaviour of the basic class.
 *
 * Mainly used to add authentication or custom headers the foreign API needs.
 *
 * @export
 * @class AppRestService
 * @extends {RestService}
 */
export class AppRestService extends RestService {
  protected buildRequestOptions(options: RequestOptions): RequestOptions {
    options.withCredentials = true;
    (options.headers as Headers).append('X-FOO', 'bar');
    return options;
  }
}

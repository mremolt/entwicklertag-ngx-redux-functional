import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { RestService } from '@dcs/ngx-utils';

/**
 * AppRestService extends RestService and is used to override the default behaviour of the basic class.
 *
 * Mainly used to add authentication or custom headers the foreign API needs.
 *
 * @export
 */
@Injectable()
export class AppRestService extends RestService {
  protected buildRequestOptions(options: any): any {
    if (!options.headers) {
      options.headers = new HttpHeaders({});
    }

    // example on how to add custom headers and activate credentials (== cookies for ajax requests).
    options.headers = options.headers.append('X-FOO', 'bar');
    options.withCredentials = true;

    return super.buildRequestOptions(options);
  }
}

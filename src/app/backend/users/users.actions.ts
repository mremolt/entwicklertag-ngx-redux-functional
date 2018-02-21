import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';
import { IApiAction, API_ACTION } from '@dcs/ngx-utils';
import { schema } from 'normalizr';
import * as compose from 'ramda/src/compose';
import * as lensPath from 'ramda/src/lensPath';
import * as over from 'ramda/src/over';
import * as uuid from 'uuid/v4';
import { AnyAction } from 'redux';

const address = new schema.Entity('address');
const company = new schema.Entity('company');

const addressLens = lensPath(['address', 'id']);
const companyLens = lensPath(['company', 'id']);
const addDummyIds = compose(over(addressLens, uuid), over(companyLens, uuid));

export const userSchema = new schema.Entity(
  'users',
  { address, company },
  {
    idAttribute: user => String(user.id),
  }
);

export const fetchActions = {
  base: 'USER_FETCH',
  start: 'USER_FETCH_START',
  success: 'USER_FETCH_SUCCESS',
  error: 'USER_FETCH_ERROR',
  complete: 'USER_FETCH_COMPLETE',
  reset: 'USER_FETCH_RESET',
};

export function fetchUser(cancel?: Observable<any>): IApiAction {
  return {
    type: API_ACTION,
    payload: {
      request: {
        url: '//jsonplaceholder.typicode.com/users/1',
        method: 'GET',
      },
      handlers: {
        start() {
          return { type: fetchActions.start };
        },
        success(data: any) {
          return { type: fetchActions.success, payload: data };
        },
        error(error: HttpErrorResponse) {
          return { type: fetchActions.error, payload: error, error: true };
        },
        complete: () => {
          return { type: fetchActions.complete };
        },
      },
      cancel,
      normalizrSchema: userSchema,
    },
  };
}

export function fetchUser2(id: string): IApiAction {
  return {
    type: API_ACTION,
    payload: {
      request: {
        url: `users/${id}`,
        method: 'GET',
      },
      handlers: fetchActions.base,
      normalizrSchema: userSchema,
      rawDataProcessor: addDummyIds,
    },
  };
}

export function resetUser(): AnyAction {
  return {
    type: fetchActions.reset,
  };
}

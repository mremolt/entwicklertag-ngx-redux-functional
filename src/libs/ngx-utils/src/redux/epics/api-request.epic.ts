import { HttpClient } from '@angular/common/http';
import { AnyAction, Store } from 'redux';
import { normalize } from 'normalizr';
import { ofType } from 'redux-observable';
import { generateAsyncActionNames } from '@dcs/redux-utils';
import { Observable } from 'rxjs/Observable';
import { concat } from 'rxjs/observable/concat';
import { never } from 'rxjs/observable/never';
import { of } from 'rxjs/observable/of';
import { catchError, map, mergeMap, takeUntil } from 'rxjs/operators';

import { API_ACTION } from '../tokens';
import { IApiAction, IApiActionHandlers } from '../interfaces';
import { IEnvironment } from '../../environment/interfaces';

export function getHandlers(handlers: IApiActionHandlers | string, meta?: object): IApiActionHandlers {
  if (typeof handlers === 'string') {
    const actions = generateAsyncActionNames(handlers);

    return {
      start() {
        return { type: actions.start, meta: { ...meta } };
      },
      success(data) {
        return { type: actions.success, payload: data, meta: { ...meta } };
      },
      error(error) {
        return { type: actions.error, payload: error, error: true, meta: { ...meta } };
      },
      complete() {
        return { type: actions.complete, meta: { ...meta } };
      },
    };
  } else {
    return handlers;
  }
}

export function getUrl(urlPath: string, environment: IEnvironment) {
  const urlRegex = /^(http(s)?|\/\/)/;

  if (urlPath.match(urlRegex)) {
    return urlPath;
  } else {
    return `${environment.apiUrl.replace(/\/$/, '')}/${urlPath.replace(/^\//, '')}`;
  }
}

export function defaultDataProcessor(data: any) {
  return data;
}

export function apiRequestEpic<S>(
  action$: Observable<AnyAction>,
  _: Store<S>,
  dependencies: { http: HttpClient; environment: IEnvironment }
): Observable<AnyAction> {
  return action$.pipe(
    ofType(API_ACTION),
    mergeMap((action: IApiAction) => {
      const handlers: IApiActionHandlers = getHandlers(action.payload.handlers, action.meta);
      const request = action.payload.request;

      return concat(
        of(handlers.start()),
        dependencies.http
          .request(request.method, getUrl(request.url, dependencies.environment), request.options)
          .pipe(
            map(action.payload.rawDataProcessor || defaultDataProcessor),
            map(data => {
              if (action.payload.normalizrSchema) {
                return normalize(data, action.payload.normalizrSchema);
              }
              return data;
            }),
            map(handlers.success),
            catchError(error => of(handlers.error(error))),
            takeUntil(action.payload.cancel || never())
          ),
        of(handlers.complete())
      );
    })
  );
}

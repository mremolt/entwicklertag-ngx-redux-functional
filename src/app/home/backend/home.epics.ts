import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs';
import { IAction } from '@dcs/ngx-utils';
import { HOME_GREET_WORLD, HOME_SET_NAME } from './home.actions';

export function greetDcsEpic(action$: ActionsObservable<IAction>): Observable<IAction> {
  return action$.ofType(HOME_GREET_WORLD).delay(1000).mapTo({ type: HOME_SET_NAME, payload: 'DCS' });
}

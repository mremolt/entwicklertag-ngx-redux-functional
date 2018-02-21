import { combineEpics } from 'redux-observable';
import { apiRequestEpic } from '@dcs/ngx-utils';
import { errorEpic } from '@dcs/redux-utils';

export const rootEpic = combineEpics(apiRequestEpic, errorEpic);

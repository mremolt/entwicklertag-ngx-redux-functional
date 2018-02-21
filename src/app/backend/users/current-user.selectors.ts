import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';

import { IState } from '../interfaces';
import { userSchema } from './users.actions';

export const rawCurrentUserState = (state: IState) => state.currentUser;

export const denormalizedCurrentUserState = createSelector([rawCurrentUserState], state => {
  return denormalize(state.result, userSchema, state.entities) || {};
});

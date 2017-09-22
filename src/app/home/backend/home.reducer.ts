import { IAction } from '@dcs/ngx-utils';

import { HOME_SET_NAME, HOME_GREET_WORLD } from './home.actions';

export const initialState: string = 'Unknown';

export function homeReducer(state: string = initialState, action: IAction): string {
  switch (action.type) {
    case HOME_SET_NAME:
      return action.payload;

    case HOME_GREET_WORLD:
      return 'World';
  }

  return state;
}

import { IState } from '@dcs/ngx-utils';
import { fromJS } from 'immutable';

import { homeGreetingSelector } from './home.selectors';

describe('home selectors', () => {
  let state: IState;

  beforeAll(() => {
    state = fromJS({
      home: 'World'
    });
  });

  describe('homeGreetingSelector', () => {
    it('returns the correct substate', () => {
      expect(homeGreetingSelector(state)).toEqual('World');
    });
  });
});

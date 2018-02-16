import { HomeActions } from './home.actions';

describe('HomeActions', () => {
  let subject: HomeActions;

  beforeEach(() => {
    subject = new HomeActions();
  });

  describe('setName', () => {
    it('returns the correct action object', () => {
      expect(subject.setName('Arthur')).toEqual({
        type: 'HOME_SET_NAME',
        payload: 'Arthur'
      });
    });
  });

  describe('greetWorld', () => {
    it('returns the correct action object', () => {
      expect(subject.greetWorld()).toEqual({
        type: 'HOME_GREET_WORLD'
      });
    });
  });
});

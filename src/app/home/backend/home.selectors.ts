import { IState } from '@dcs/ngx-utils';

export function homeGreetingSelector(state: IState): string {
  return state.get('home');
}

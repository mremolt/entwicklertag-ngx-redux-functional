import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { IAction } from '@dcs/ngx-utils';

export const HOME_SET_NAME: string = 'HOME_SET_NAME';
export const HOME_GREET_WORLD: string = 'HOME_GREET_WORLD';

@Injectable()
export class HomeActions {
  @dispatch()
  public setName(name: string): IAction {
    return { type: HOME_SET_NAME, payload: name };
  }

  @dispatch()
  public greetWorld(): IAction {
    return { type: HOME_GREET_WORLD };
  }
}

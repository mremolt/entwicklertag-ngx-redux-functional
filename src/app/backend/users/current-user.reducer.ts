import { AnyAction } from 'redux';
import { HttpErrorResponse } from '@angular/common/http';

import { IUser, IAddress, ICompany } from './interfaces';
import { fetchActions } from './users.actions';

export interface ICurrentUserState {
  entities: {
    users: { [key: string]: IUser };
    address: { [key: string]: IAddress };
    company: { [key: string]: ICompany };
  };
  result: string | null;
  loading: boolean;
  loaded: boolean;
  error: HttpErrorResponse | null;
}

export const initialState: ICurrentUserState = {
  entities: { users: {}, address: {}, company: {} },
  result: null,
  loading: false,
  loaded: false,
  error: null,
};

export function currentUser(state: ICurrentUserState = initialState, action: AnyAction): ICurrentUserState {
  switch (action.type) {
    case fetchActions.start:
      return { ...state, loading: true, loaded: false, error: null };

    case fetchActions.success:
      return { ...initialState, loaded: true, ...action.payload };

    case fetchActions.error:
      return { ...initialState, error: action.payload, loading: false };

    case fetchActions.complete:
      if (state.loading) {
        return { ...state, loading: false };
      }
      return state;

    case fetchActions.reset:
      return initialState;
  }
  return state;
}

import { HttpErrorResponse } from '@angular/common/http';
import { AnyAction } from 'redux';

import { IPost } from './posts.reducer';
import { fetchOneActions } from './posts.actions';

export interface ICurrentPostState {
  result: IPost | {};
  loading: boolean;
  loaded: boolean;
  error: HttpErrorResponse | null;
}

export const initialState: ICurrentPostState = {
  result: {},
  loading: false,
  loaded: false,
  error: null,
};

export function currentPost(state: ICurrentPostState = initialState, action: AnyAction): ICurrentPostState {
  switch (action.type) {
    case fetchOneActions.start:
      return { ...state, loading: true, loaded: false, error: null };

    case fetchOneActions.success:
      return { ...state, loading: false, loaded: true, result: action.payload };

    case fetchOneActions.error:
      return { ...initialState, result: {}, error: action.payload };

    case fetchOneActions.complete:
      if (state.loading) {
        return { ...state, loading: false };
      }
      return state;

    case fetchOneActions.reset:
      return initialState;
  }

  return state;
}

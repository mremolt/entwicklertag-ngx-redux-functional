import { HttpErrorResponse } from '@angular/common/http';
import { AnyAction } from 'redux';

import { fetchActions } from './posts.actions';

export interface IComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface IGeo {
  lat: string;
  lng: string;
}

export interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeo;
}

export interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAddress;
  phone: string;
  website: string;
  company: ICompany;
}

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
  comments: IComment[];
  user: IUser;
}

export interface IPostsState {
  entities: {
    posts: { [key: string]: IPost };
    users: { [key: string]: IUser };
    comments: { [key: string]: IComment };
  };
  result: string[];
  loading: boolean;
  loaded: boolean;
  page: number;
  error: HttpErrorResponse | null;
}

export const initialState: IPostsState = {
  entities: {
    posts: {},
    users: {},
    comments: {},
  },
  result: [],
  loading: false,
  loaded: false,
  page: 1,
  error: null,
};

export function posts(state: IPostsState = initialState, action: AnyAction): IPostsState {
  switch (action.type) {
    case fetchActions.start:
      return { ...state, loading: true, page: action.meta.page };

    case fetchActions.success:
      return { ...state, loaded: true, loading: false, ...action.payload };

    case fetchActions.error:
      return { ...initialState, error: action.payload };

    case fetchActions.reset:
      return initialState;
  }

  return state;
}

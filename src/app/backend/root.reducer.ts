import { combineReducers, Reducer } from 'redux';
import { routerReducer as router } from '@angular-redux/router';
import { error } from '@dcs/redux-utils';

import { IState } from './interfaces';
import { currentUser } from './users/current-user.reducer';
import { posts } from './posts/posts.reducer';
import { currentPost } from './posts/current-post.reducer';

export const rootReducer: Reducer<IState> = combineReducers({
  router,
  currentUser,
  error,
  posts,
  currentPost,
});

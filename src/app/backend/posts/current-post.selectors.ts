import { createSelector } from 'reselect';

import { IState } from '../interfaces';
import { ICurrentPostState } from './current-post.reducer';
import { Post } from './models/post.class';

export const currentPostStateSelector: (state: IState) => ICurrentPostState = (state: IState) =>
  state.currentPost;
export const loadingSelector: (state: IState) => boolean = (state: IState) =>
  currentPostStateSelector(state).loading;
export const loadedSelector: (state: IState) => boolean = (state: IState) =>
  currentPostStateSelector(state).loaded;

export const rawCurrentPostSelector = createSelector([currentPostStateSelector], postState => {
  return postState.result;
});

export const postSelector = createSelector([rawCurrentPostSelector], rawPost => {
  return new Post(rawPost);
});

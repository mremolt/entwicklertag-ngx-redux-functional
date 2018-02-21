import { denormalize } from 'normalizr';
import { createSelector, OutputSelector } from 'reselect';

import { IState } from '../interfaces';
import { postsSchema } from './posts.actions';
import { IPostsState, IPost } from './posts.reducer';
import { Post } from './models/post.class';

export const postsStateSelector: (state: IState) => IPostsState = (state: IState) => state.posts;
export const pageSelector: (state: IState) => number = (state: IState) => Number(state.posts.page);
export const loadingSelector: (state: IState) => boolean = (state: IState) => state.posts.loading;
export const loadedSelector: (state: IState) => boolean = (state: IState) => state.posts.loaded;

// OutputSelector<IState, any, (res: any) => any>
export const rawPostsSelector: OutputSelector<
  IState,
  IPost[],
  (res: IPostsState) => IPost[]
> = createSelector([postsStateSelector], postsState => {
  return denormalize(postsState.result, postsSchema, postsState.entities);
});

export const postsSelector = createSelector([rawPostsSelector], rawPosts => {
  return rawPosts.map(data => new Post(data));
});

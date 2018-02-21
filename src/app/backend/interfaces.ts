import { IErrorState } from '@dcs/redux-utils';

import { ICurrentUserState } from './users/current-user.reducer';
import { IPostsState } from './posts/posts.reducer';
import { ICurrentPostState } from './posts/current-post.reducer';

export interface IState {
  router: string;
  currentUser: ICurrentUserState;
  error: IErrorState;
  posts: IPostsState;
  currentPost: ICurrentPostState;
}

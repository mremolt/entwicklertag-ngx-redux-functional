import { IApiAction, API_ACTION } from '@dcs/ngx-utils';
import { generateAsyncActionNames } from '@dcs/redux-utils';
import { schema } from 'normalizr';
import { Observable } from 'rxjs/Observable';

export const user = new schema.Entity('users');
export const comment = new schema.Entity('comments');
export const comments = new schema.Array(comment);
export const post = new schema.Entity('posts', {
  user,
  comments,
});
export const postsSchema = new schema.Array(post);

export const fetchActions = generateAsyncActionNames('POSTS_FETCH');
export const fetchOneActions = generateAsyncActionNames('POSTS_FETCH_ONE');

export function fetch(page: number = 1, limit: number = 2, cancel?: Observable<any>): IApiAction {
  return {
    type: API_ACTION,
    payload: {
      request: {
        url: `posts?_page=${page}&_limit=${limit}&_embed=comments&_expand=user`,
        method: 'GET',
      },
      handlers: fetchActions.base,
      normalizrSchema: postsSchema,
      cancel,
    },
    meta: { page },
  };
}

export function fetchOne(id: string, cancel?: Observable<any>): IApiAction {
  return {
    type: API_ACTION,
    payload: {
      request: {
        url: `posts/${id}?_embed=comments&_expand=user`,
        method: 'GET',
      },
      handlers: fetchOneActions.base,
      cancel,
    },
  };
}

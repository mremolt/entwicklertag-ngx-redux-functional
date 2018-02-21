import { Routes } from '@angular/router';

import { BlogComponent } from './blog.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

export const blogRoutes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      { path: '', redirectTo: '1' },
      { path: ':page', component: PostsListComponent },
      { path: 'post/:id', component: PostDetailComponent },
    ],
  },
];

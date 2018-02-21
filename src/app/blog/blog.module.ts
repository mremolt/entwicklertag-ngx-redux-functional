import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { blogRoutes } from './blog.routes';
import { BlogComponent } from './blog.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListElementComponent } from './post-list-element/post-list-element.component';

@NgModule({
  declarations: [BlogComponent, PostsListComponent, PostDetailComponent, PostListElementComponent],
  imports: [RouterModule.forChild(blogRoutes), CommonModule],
  providers: [],
})
export class BlogModule {}

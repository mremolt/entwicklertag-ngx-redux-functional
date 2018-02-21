import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgRedux, select } from '@angular-redux/store';
import { ContainerComponent } from '@dcs/ngx-utils';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { merge } from 'rxjs/observable/merge';
import { skip } from 'rxjs/operators';

import { IState } from '../../backend/interfaces';
import { fetch } from '../../backend/posts/posts.actions';
import { Post } from '../../backend/posts/models/post.class';
import {
  postsSelector,
  pageSelector,
  loadingSelector,
  loadedSelector,
} from '../../backend/posts/posts.selectors';

@Component({
  selector: 'dcs-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsListComponent extends ContainerComponent implements OnInit {
  public posts: Post[] = [];
  public page: number = 1;
  public loading: boolean = false;
  public loaded: boolean = false;

  @select(postsSelector) private posts$: Observable<Post[]>;
  @select(pageSelector) private page$: Observable<number>;
  @select(loadingSelector) private loading$: Observable<boolean>;
  @select(loadedSelector) private loaded$: Observable<boolean>;

  get prevPage(): number {
    return this.page - 1;
  }

  get nextPage(): number {
    return this.page + 1;
  }

  constructor(private store: NgRedux<IState>, private route: ActivatedRoute, private cd: ChangeDetectorRef) {
    super();
  }

  public ngOnInit() {
    const cancelAllWork$ = merge(this.page$.pipe(skip(1)), this.onDestroy$);

    this.subscribeToObservable(combineLatest(this.loading$, this.loaded$, this.posts$, this.page$), args => {
      const [loading, loaded, posts, page] = args;

      this.loading = loading;
      this.loaded = loaded;
      this.posts = posts;
      this.page = page;
      this.cd.markForCheck();
    });

    this.subscribeToObservable(this.route.params, params => {
      if (this.needsFreshData(params.page)) {
        this.store.dispatch(fetch(params.page, 5, cancelAllWork$));
      }
    });
  }

  protected needsFreshData(page: number): boolean {
    return Number(page) !== this.page || !this.loaded;
  }
}

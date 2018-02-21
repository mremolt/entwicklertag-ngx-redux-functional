import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgRedux, select } from '@angular-redux/store';
import { ContainerComponent } from '@dcs/ngx-utils';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { skip } from 'rxjs/operators';

import { IState } from '../../backend/interfaces';
import { fetchOne } from '../../backend/posts/posts.actions';
import { Post } from '../../backend/posts/models/post.class';
import { postSelector, loadingSelector, loadedSelector } from '../../backend/posts/current-post.selectors';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
  selector: 'dcs-post-detail',
  templateUrl: './post-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailComponent extends ContainerComponent implements OnInit {
  public post: Post;
  public loading: boolean;
  public loaded: boolean;

  @select(postSelector) private post$: Observable<Post>;
  @select(loadingSelector) private loading$: Observable<boolean>;
  @select(loadedSelector) private loaded$: Observable<boolean>;

  constructor(
    private store: NgRedux<IState>,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    public location: Location
  ) {
    super();
  }

  public ngOnInit(): void {
    const cancelAllWork$ = merge(this.route.params.pipe(skip(1)), this.onDestroy$);

    this.subscribeToObservable(combineLatest(this.post$, this.loading$, this.loaded$), data => {
      const [post, loading, loaded] = data;
      this.post = post;
      this.loading = loading;
      this.loaded = loaded;

      console.warn(post.id, loading);
      this.cd.markForCheck();
    });

    this.subscribeToObservable(this.route.params, params => {
      this.store.dispatch(fetchOne(params.id, cancelAllWork$));
    });
  }
}

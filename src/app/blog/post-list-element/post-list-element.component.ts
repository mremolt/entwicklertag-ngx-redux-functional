import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Post } from '../../backend/posts/models/post.class';

@Component({
  // tslint:disable-next-line
  selector: '[dcsPostListElement]',
  templateUrl: './post-list-element.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListElementComponent {
  @Input() public post: Post;
}

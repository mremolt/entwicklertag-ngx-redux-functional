import { IPost, IUser, IComment } from '../posts.reducer';
import { ViewModel } from './view-model.class';

export class Post extends ViewModel<IPost> implements IPost {
  public userId: number;
  public id: number;
  public title: string;
  public body: string;
  public comments: IComment[];

  get commentCount(): number {
    return this.comments.length;
  }

  get user(): IUser {
    return this.props.user || ({} as any);
  }
}

/**
 * Post service injected at root
 */

import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Post} from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, user: string, score: number, content: string, ) {
    const post: Post = {
      title: title,
      user: user,
      score: score,
      content: content,
    };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }

}

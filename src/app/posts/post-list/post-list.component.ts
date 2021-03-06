/**
 * List all posts
 */

import {Component, OnInit, OnDestroy} from "@angular/core"
import {Post} from '../post.model'
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit,OnDestroy{
  // posts = [
  //   {title: 'First Post', content:'This is content for 1st post'},
  //   {title: 'Second Post', content:'This is content for 2nd post'},
  //   {title: 'Third Post', content:'This is content for 3rd post'}
  // ];
  posts: Post[] = [];
  private postsSub: Subscription;
  isLoading = false;

  constructor(public postsService: PostsService) {}

  ngOnInit(){
    this.postsService.getPosts();
    this.isLoading = true;
    this.postsSub = this.postsService.getPostUpdateListener()
       .subscribe((posts: Post[]) => {
         this.posts = posts;
         this.isLoading = false;
       });
  }

onDelete(postId: string){
  this.postsService.deletePost(postId);
}

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
};

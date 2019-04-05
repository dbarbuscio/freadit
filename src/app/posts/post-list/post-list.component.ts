import {Component, OnInit, OnDestroy} from "@angular/core"
import { PageEvent } from '@angular/material';
import {Post} from '../posts.model'
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';


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
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public postsService: PostsService, private authService: AuthService) {}

  ngOnInit(){
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService.getPostUpdateListener()
       .subscribe((postData: {posts: Post[], postCount: number}) => {
         this.totalPosts = postData.postCount;
         this.posts = postData.posts;
         console.log('My posts', this.posts);
         this.isLoading = false;
       });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(isAuththenticated => {
      this.userIsAuthenticated = isAuththenticated;
      this.userId = this.authService.getUserId();
      console.log('My user ID', this.userId);
    });
  }

onChangedPage(pageData: PageEvent) {
  this.isLoading = true;
  this.currentPage = pageData.pageIndex + 1;
  this.postsPerPage = pageData.pageSize;
  this.postsService.getPosts(this.postsPerPage, this.currentPage);
}

onDelete(postId: string){
  this.postsService.deletePost(postId).subscribe(() => {
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }, () => {
    this.isLoading = false;
  });
}

  ngOnDestroy(){
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
};

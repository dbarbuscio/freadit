import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredContent = '';
  enteredTitle = '';
  private mode = 'create';
  private postId: string;
  post: Post;
  isLoading = false;
  form: FormGroup;

  constructor( public postsService: PostsService, public route: ActivatedRoute ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.form = new FormGroup ({
        title: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)]
        }),
          content: new FormControl(null, {validators: [Validators.required]}),
          score: new FormControl(null),
          user: new FormControl(null)
      });
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.post = {
            id: postData._id,
            score: null,
            user: null,
            title: postData.title,
            content: postData.content
          };
          this.form.setValue({
            title: this.post.title,
            user: this.post.user,
            score: this.post.score,
            content: this.post.content
          });
          this.isLoading = false;
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(this.form.value.title, this.form.value.content);

    } else {
      this.postsService.updatePost(this.postId, null, null, this.form.value.title, this.form.value.content);
    }

    this.form.reset();
  }
}

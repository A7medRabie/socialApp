import { Component, DestroyRef, inject, signal } from '@angular/core';
 import { PostCardComponent } from "../../../shared/components/post-card/post-card.component";

  import { AddPostComponent } from '../../../shared/components/add-post/add-post.component';    
import { AllPostsResponse, Comment, Post } from '../../../core/interfaces/posts.Interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PostsService } from '../../../core/services/posts.service';
import { SCommentComponent } from "../../../shared/components/s-comment/s-comment.component";
import { AddCommentComponent } from "../../../shared/components/add-comment/add-comment.component";
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-timeline',
  imports: [AddPostComponent, PostCardComponent, SCommentComponent, AddCommentComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent {

  posts=signal<Post[]>([]);
  trigger:Record<string,boolean>={}
 
  private readonly _postService=inject(PostsService)
  private readonly _destroyRef=inject(DestroyRef)

  ngOnInit(): void {
    this.getAllPosts()
  }
 
getAllPosts(){ 
  this._postService.getAllPosts().pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
    next: (response) => {
      this.posts.set(response.posts );
       console.log(this.posts);
      
    },
    error: (error) => {
      console.log(error);
      
    },
    complete: () => {
      
    }
  })
 }

 //method to update comments in posts signal
  updateComments(postId:string,updatedComments:Comment[]){
    this.posts.update((posts)=>{
      return posts.map((post)=>{
        if(post.id===postId){
          return {...post,comments:updatedComments.sort((a,b)=>new Date(a.createdAt).getTime()-new Date(b.createdAt).getTime())};
        }
        return post;
      })
    })
  }


}

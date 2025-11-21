import { Component, inject, OnInit, signal } from '@angular/core';
import { PostsService } from '../../../core/services/posts.service';
import { Post, Comment } from '../../../core/interfaces/posts.Interface';
import { AddPostComponent } from "../../../shared/components/add-post/add-post.component";
import { SCommentComponent } from "../../../shared/components/s-comment/s-comment.component";
import { PostCardComponent } from "../../../shared/components/post-card/post-card.component";
import { AddCommentComponent } from "../../../shared/components/add-comment/add-comment.component";
import { getLoggedUser } from '../../../core/interfaces/user.interface';

@Component({
  selector: 'app-profile',
  imports: [AddPostComponent, SCommentComponent, PostCardComponent, AddCommentComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
private readonly _postService=inject(PostsService)
userPosts=signal<Post[]>([]);
user!:getLoggedUser;
trigger:Record<string,boolean>={}

ngOnInit(): void {
  this.getUserPosts();
}
 
getUserPosts(){
  this.user=JSON.parse(localStorage.getItem('user')!);
  this._postService.getUserPosts(this.user.user._id).subscribe({ 
    next:(posts)=>{
      this.userPosts.set(posts.posts);
      console.log(posts);
      
    },
    error:(err)=>{
      console.error("Error fetching user posts:", err);
    }
  }); 

}

updateComments(postId:string,updatedComments:Comment[]){
    this.userPosts.update((userPosts)=>{
      return userPosts.map((post)=>{
        if(post.id===postId){
          return {...post,comments:updatedComments.sort((a,b)=>new Date(a.createdAt).getTime()-new Date(b.createdAt).getTime())};
        }
        return post;
      })
    })
  }

}

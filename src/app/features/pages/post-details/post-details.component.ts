import { Component, inject, OnInit, signal, WritableSignal, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../../core/services/posts.service';
import { Comment, Post } from '../../../core/interfaces/posts.Interface';
import { PostCardComponent } from "../../../shared/components/post-card/post-card.component";
import { SCommentComponent } from "../../../shared/components/s-comment/s-comment.component";
import { AddCommentComponent } from "../../../shared/components/add-comment/add-comment.component";

@Component({
  selector: 'app-post-details',
  imports: [PostCardComponent, SCommentComponent, AddCommentComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent implements OnInit {
private readonly _route=inject(ActivatedRoute);
private readonly _postService=inject(PostsService)
postId:string=""
postDetails=signal<Post>({} as Post);
 
 
ngOnInit(): void {
   this.getPostId()
    this.getPostDetails()
}
getPostId(){
     this.postId=this._route.snapshot.paramMap.get('id')!;
     console.log(this.postId);
     
}
getPostDetails(){
  this._postService.getSinglePost(this.postId).subscribe({
    next:(response)=>{
      this.postDetails.set(response.post)
      console.log(this.postDetails());     
    },
    error:(error)=>{
      console.log(error);
      
    },
    complete:()=>{
      
    }
  })
    }


 //method to update comments in posts signal
  updateComments(updatedComments:Comment[]){
    this.postDetails.set(
      
            {...this.postDetails(),
            comments:updatedComments.sort((a,b)=>new Date(a.createdAt).getTime()-new Date(b.createdAt).getTime())}
    )
  }
    
}

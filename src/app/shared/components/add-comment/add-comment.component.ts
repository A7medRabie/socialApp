import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommentsService } from '../../../core/services/comments.service';
import { CommentBody } from '../../../core/interfaces/comments.Interface';
import { FormControl, FormControlName, ReactiveFormsModule, RequiredValidator, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { TimelineComponent } from '../../../features/pages/timeline/timeline.component';
import { Comment } from '../../../core/interfaces/posts.Interface';
 
@Component({
  selector: 'app-add-comment',
  imports: [ReactiveFormsModule],
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.css'
})
export class AddCommentComponent {
 @Input() postId:string="";
 @Output() commentsUpdated=new EventEmitter<Comment[]>();
private readonly _commentsService=inject(CommentsService);

  content:FormControl=new FormControl("",[Validators.required,Validators.minLength(1),Validators.pattern(/\S+/)]);

onsubmit(e:Event){ 
  e.preventDefault();
   
  if(this.content.valid){
     
    this._commentsService.createComment({post:this.postId,content:this.content.value}).subscribe({
      next:(response)=>{ 
         this.commentsUpdated.emit(response.comments);
        
       },
      error:(error)=>{
        console.log(error);
      },
      complete:()=>{
        this.content.reset();
      }

    })
  }
}

}

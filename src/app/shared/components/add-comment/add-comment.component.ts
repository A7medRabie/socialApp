import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommentsService } from '../../../core/services/comments.service';
 import { FormControl, FormControlName, ReactiveFormsModule, RequiredValidator, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
  import { Comment } from '../../../core/interfaces/posts.Interface';
import { TranslatePipe } from '@ngx-translate/core';
 
@Component({
  selector: 'app-add-comment',
  imports: [ReactiveFormsModule,TranslatePipe],
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

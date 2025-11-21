import { Component, Input } from '@angular/core';
import { Comment } from '../../../core/interfaces/posts.Interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-s-comment',
  imports: [DatePipe],
  templateUrl: './s-comment.component.html',
  styleUrl: './s-comment.component.css'
})
export class SCommentComponent {

  @Input() comment!:Comment;
menuOpen = false;
 
toggleMenu() {
  this.menuOpen = !this.menuOpen;
}

onEdit() {
  this.menuOpen = false;
  console.log("Edit clicked!");
  
}

onDelete() {
  this.menuOpen = false;
  console.log("Delete clicked!");
 
}
}


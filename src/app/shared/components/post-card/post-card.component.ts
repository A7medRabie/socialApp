 import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../../core/interfaces/posts.Interface';
import { DatePipe } from '@angular/common';
import { RouterLink } from "@angular/router";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-post-card',
  imports: [DatePipe, RouterLink,TranslatePipe],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent {
menuOpen = false;
@Input() post!:Post;
@Output() loadComments=new EventEmitter<void>();

toggleMenu() {
  this.menuOpen = !this.menuOpen;
}

onEdit() {
  this.menuOpen = false;
  console.log("Edit clicked!");
  
}

onDelete() {
  this.menuOpen = false;
  
}
onShowComments(){
  this.loadComments.emit();
 }
}

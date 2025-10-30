 import { Component } from '@angular/core';

@Component({
  selector: 'app-post-card',
  imports: [],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent {
menuOpen = false;

toggleMenu() {
  this.menuOpen = !this.menuOpen;
}

onEdit() {
  this.menuOpen = false;
  console.log("Edit clicked!");
  // هنا تفتح مودال التعديل مثلاً
}

onDelete() {
  this.menuOpen = false;
  console.log("Delete clicked!");
  // هنا تستدعي API حذف البوست مثلاً
}
}

import { Component } from '@angular/core';
 import { PostCardComponent } from "../../../shared/components/post-card/post-card.component";

  import { AddPostComponent } from '../../../shared/components/add-post/add-post.component';    
@Component({
  selector: 'app-timeline',
  imports: [AddPostComponent, PostCardComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent {

}

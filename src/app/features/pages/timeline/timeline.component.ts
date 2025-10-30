import { Component } from '@angular/core';
import { AddPostComponent } from "../../../shared/components/add-post/add-post.component";

@Component({
  selector: 'app-timeline',
  imports: [AddPostComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent {

}

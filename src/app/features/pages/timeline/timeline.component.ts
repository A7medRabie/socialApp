import { Component } from '@angular/core';
 import { PostCardComponent } from "../../../shared/components/post-card/post-card.component";

@Component({
  selector: 'app-timeline',
  imports: [ PostCardComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent {

}

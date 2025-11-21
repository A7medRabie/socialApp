import { NgClass } from '@angular/common';
import { booleanAttribute, Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'lib-custom-button',
  imports: [],
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.css'
})
export class CustomButtonComponent {
@Input() label: string = '';
@Input() disabled: boolean = false
@Input()isloading: boolean = false
@Output() onClick = new EventEmitter<Event>();
handleClick(e: Event) {
  if (!this.disabled) {
  this.onClick.emit(e);
  }
}

}

import { NgClass } from '@angular/common';
import { AfterViewInit, Component, ElementRef, forwardRef, inject, Input, NgZone, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor,FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-custom-input',
  imports: [NgClass,ReactiveFormsModule],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ]
 
})
export class CustomInputComponent implements AfterViewInit, ControlValueAccessor {

@Input() type: string = '';
@Input() placeholder: string = '';
@Input() control!:AbstractControl | null;
@Input() parentForm!: FormGroup;
@Input() label: string = '';
@Input() datepicker:boolean = false;
value!:string

private ngZone = inject(NgZone);

@ViewChild('datepickerInput') datepickerInput!: ElementRef;


 ngAfterViewInit() {
  const el = this.datepickerInput.nativeElement;

 if(this.datepicker) {
  
  el.addEventListener('changeDate', () => {
    const value = el.value;
    this.ngZone.run(() => {
    this.control?.setValue(value);
    });
     
  });
}
 }
 
 
 onChange:(value: string ) => void = () => {};
 onTouched: () => void = () => {};

 writeValue(value: string): void {
    this.value = value;
   }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

   handleInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
  }
   


 
   
}

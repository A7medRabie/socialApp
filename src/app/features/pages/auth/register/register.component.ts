import { NgClass } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, NgZone, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { initFlowbite } from 'flowbite';
 
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, AfterViewInit {
  registerForm!: FormGroup;
  @ViewChild('datepickerInput') datepickerInput!: ElementRef;



  constructor(private fb: FormBuilder, private ngZone: NgZone) {}

  ngOnInit(): void {
        initFlowbite();
    
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  ngAfterViewInit() {
  const el = this.datepickerInput.nativeElement;

 
  el.addEventListener('changeDate', () => {
    const value = el.value;
    this.ngZone.run(() => {
      this.registerForm.get('dob')?.setValue(value);
    });
     
  });
}


  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form Data:', this.registerForm.value);
     } else {
      this.registerForm.markAllAsTouched();
    }
  }

 
}
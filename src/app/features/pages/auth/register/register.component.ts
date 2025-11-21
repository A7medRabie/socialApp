 import { Component, DestroyRef, OnInit,  inject, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { CustomInputComponent, CustomButtonComponent } from "../../../../../../projects/shared-ui/src/public-api";
import { AuthService } from '../../../../../../projects/auth/src/public-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Toast, ToastrService } from 'ngx-toastr';
import { ToastService } from '../../../../../../projects/shared-utils/src/public-api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CustomInputComponent, CustomButtonComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  apiError: string = '';
  isloading:boolean=false

  private readonly _fb=inject(FormBuilder)
  private readonly _authService=inject(AuthService)
  private readonly _destroyRef=inject(DestroyRef)
  private readonly _toastr=inject(ToastService)
  private readonly _router=inject(Router)



 
  ngOnInit(): void {
    
        initFlowbite();
    
    this.registerForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
    },   { validators: this.matchPasswordsValidator }
);
console.log(this.registerForm);

  }

 


matchPasswordsValidator(form:AbstractControl){ // for matching password
     
      const pass=form.get("password")?.value;
      const repass=form.get("rePassword")?.value;
      if (pass===repass) {
        return null
      }else {return{misMatch:true}}  // return mismath in error of api instead of null
 
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isloading=true
      this._authService.register(this.registerForm.value).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
        next: (response) => {
          console.log(response);
          this._toastr.success("Registration Successful","Welcome Aboard!")
          this._router.navigate(['/login'])

        },
        error: (error) => {
           
         this.isloading=false
   
                  
         },
        complete: () => {
          this.isloading=false
          

        }
      })
      } else {
      this.registerForm.markAllAsTouched();
    }
  }

 
}
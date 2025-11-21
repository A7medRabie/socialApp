import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CustomInputComponent, CustomButtonComponent } from "../../../../../../projects/shared-ui/src/public-api";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormBuilder, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../../../../../projects/auth/src/public-api';
import { ToastService } from '../../../../../../projects/shared-utils/src/public-api';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CustomInputComponent, CustomButtonComponent,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit {
  login!: FormGroup;
  isloading:boolean=false

  private readonly _fb=inject(FormBuilder)
  private readonly _authService=inject(AuthService)
  private readonly _destroyRef=inject(DestroyRef)
  private readonly _toastr=inject(ToastService)
  private readonly _router=inject(Router)



 
  ngOnInit(): void {
    
        initFlowbite();
    
    this.login = this._fb.group({
       email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
       
    } 
);
 
  }

 


 

  onSubmit() {
    if (this.login.valid) {
      this.isloading=true
      this._authService.login(this.login.value).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
        next: (response) => {
           this._toastr.success("Login Successful")
           localStorage.setItem('token',response.token)
           this._authService.getLoggedUser().subscribe(user=>{
            localStorage.setItem('user',JSON.stringify(user));
           })
            this._router.navigate(['/timeline'])

        },
        error: (error) => {
           
         this.isloading=false
   
                  
         },
        complete: () => {
          this.isloading=false
          

        }
      })
      } else {
      this.login.markAllAsTouched();
    }
  }

 
}

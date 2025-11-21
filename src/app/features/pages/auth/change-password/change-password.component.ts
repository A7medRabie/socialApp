import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { CustomInputComponent, CustomButtonComponent } from "../../../../../../projects/shared-ui/src/public-api";
import { ToastService } from '../../../../../../projects/shared-utils/src/public-api';
import { AuthService } from '../../../../../../projects/auth/src/lib/auth.service';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, CustomInputComponent, CustomButtonComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  private readonly _fb=inject(FormBuilder)
  private readonly _toastr=inject(ToastService)
  private readonly _authService=inject(AuthService)
  isloading=false;

  passwordForm:FormGroup=this._fb.group({
     password: ['', [Validators.required, Validators.minLength(6)]],
     newPassword: ['', [Validators.required, Validators.minLength(6)]],
     confirmNewPassword: ['', [Validators.required, Validators.minLength(6)]],
     
  }, { validators: this.matchPasswordsValidator });


  matchPasswordsValidator(form:AbstractControl){ // for matching password
     
      const pass=form.get("newPassword")?.value;
      const repass=form.get("confirmNewPassword")?.value;
      if (pass===repass) {
        return null
      }else {return{misMatch:true}}  // return mismath in error of api instead of null
 
  }

  onSubmit(){
    if(this.passwordForm.valid){
      this.isloading=true;
        const payload={
        password:this.passwordForm.get('password')?.value!,
        newPassword:this.passwordForm.get('newPassword')?.value!
      }
      this._authService.changePassword(payload).subscribe({
        next:(response)=>{
          console.log(response);
          
          this.isloading=false;
          this._toastr.success("Password changed successfully");
          this.passwordForm.reset();
        }
        ,error:(error)=>{
          console.log(error);
          
          this.isloading=false;
          this._toastr.error(error.error.error);
        }
      })
     }
}

}

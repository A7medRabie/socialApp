import { Component, inject } from '@angular/core';
import { getLoggedUser } from '../../../core/interfaces/user.interface';
import { ToastService } from '../../../../../projects/shared-utils/src/public-api';
import { AuthService } from '../../../../../projects/auth/src/public-api';

@Component({
  selector: 'app-profile-photo',
  imports: [],
  templateUrl: './profile-photo.component.html',
  styleUrl: './profile-photo.component.css'
})
export class ProfilePhotoComponent {
user!:getLoggedUser
maxSize=200*1024; //200 KB
saveFile!:File
 
  private readonly _toastr=inject(ToastService)
  private readonly _authService=inject(AuthService)

ngOnInit(): void {
  this.user=JSON.parse(localStorage.getItem('user')!);
}

selectImage(e:Event){
     
       const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
         if (target.files[0].size > this.maxSize) {
             this._toastr.error(`File ${target.files[0].name} exceeds the maximum size of 200 KB.`);
          }
          else if (target.files[0].type !== 'image/jpeg' && target.files[0].type !== 'image/png') {
            this._toastr.error(`File ${target.files[0].name} is not a valid image. Please select a JPEG or PNG file.`);
          }
          else {
            const formData = new FormData();
            this.saveFile=target.files[0];
            formData.append('photo', this.saveFile); 
            this._authService.uploadProfilePhoto(formData).subscribe({
              next:(response)=>{
                this._authService.getLoggedUser().subscribe(user=>{
                  this.user=user;
                 localStorage.setItem('user',JSON.stringify(this.user));

                })
                  this._toastr.success("Profile photo updated successfully.");

              },
              error:(error)=>{
                 
                this._toastr.error(error.error.error);
              }
            })

            }
             
      }
       
  }
}

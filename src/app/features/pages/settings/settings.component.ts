import { Component } from '@angular/core';
import { ProfilePhotoComponent } from "../../../shared/components/profile-photo/profile-photo.component";
import { ChangePasswordComponent } from "../auth/change-password/change-password.component";
import { TranslatePipe } from '@ngx-translate/core';
 
@Component({
  selector: 'app-settings',
  imports: [ProfilePhotoComponent, ChangePasswordComponent,TranslatePipe],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

}

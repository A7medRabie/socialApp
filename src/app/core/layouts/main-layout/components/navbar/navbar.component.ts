import { AfterViewInit, Component, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { Dropdown, initFlowbite } from 'flowbite';
import { Router, RouterLink } from "@angular/router";
import { getLoggedUser, User } from '../../../../interfaces/user.interface';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MytranslateService } from '../../../../services/mytranslate.service';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink,TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit,AfterViewInit{

   user!:getLoggedUser
  isdarkMode:boolean=false;
  private readonly _router=inject(Router)
  private _translate=inject(MytranslateService)
  private readonly _translateService=inject(TranslateService)

  dropdown!: Dropdown;
  
   ngOnInit(): void {
    
    
    
         initFlowbite();
         this.user=JSON.parse(localStorage.getItem('user')!)
         if (localStorage.getItem("darkMode")) {
            this.isdarkMode=JSON.parse(localStorage.getItem("darkMode")!);
         }

   }
  ngAfterViewInit() {
    const menu = document.getElementById('user-dropdown');
    const button = document.getElementById('user-menu-button');

    if (menu && button) {
      this.dropdown = new Dropdown(menu, button);
    }
  }

  closeDropdown() {
    if (this.dropdown) {
      this.dropdown.hide();    
    }
  }


  profile(){
     this._router.navigate([`/users/${this.user.user._id}/posts`])
    // Navigate to profile page
  }
  settings(){ 
    // Navigate to settings page
    this._router.navigate([`/users/settings`])
  }
  darkMode(){
    document.documentElement.classList.toggle('dark');
    this.isdarkMode=!this.isdarkMode;
    localStorage.setItem('darkMode',JSON.stringify(this.isdarkMode));
  }
  signOut(){
    localStorage.removeItem('token');
     localStorage.removeItem('user');
    this._router.navigate(['/login']);
    // Handle sign out
  } 
  switchLanguage(lang: string) {
    this._translate.changeLanguage(lang);
   }
  currentLanguage(lang: string): boolean {
  const curr = this._translateService.currentLang || this._translateService.getDefaultLang();
  return curr === lang;
}

}

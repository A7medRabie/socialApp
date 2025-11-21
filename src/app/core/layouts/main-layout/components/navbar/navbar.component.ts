import { AfterViewInit, Component, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { Dropdown, initFlowbite } from 'flowbite';
import { Router, RouterLink } from "@angular/router";
import { getLoggedUser, User } from '../../../../interfaces/user.interface';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit,AfterViewInit {

  userId!:string
  user!:getLoggedUser
  private readonly _router=inject(Router)

  dropdown!: Dropdown;

   ngOnInit(): void {
         initFlowbite();
         this.user=JSON.parse(localStorage.getItem('user')!)

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
    this.userId=JSON.parse(localStorage.getItem('userId')!)
    this._router.navigate([`/users/${this.userId}/posts`])
    // Navigate to profile page
  }
  settings(){ 
    // Navigate to settings page
    this._router.navigate([`/users/settings`])
  }
  signOut(){
    localStorage.removeItem('token');
     localStorage.removeItem('user');
    this._router.navigate(['/login']);
    // Handle sign out
  } 
}

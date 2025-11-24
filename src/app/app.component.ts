import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { initFlowbite } from 'flowbite';
import { NgxSpinnerComponent } from "ngx-spinner";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
   

  title = 'socialApp';
  ngOnInit(): void {  
       if(localStorage.getItem('darkMode')==='true') {
         document.documentElement.classList.add('dark');    
       }
  }
 
}

import { isPlatformBrowser } from '@angular/common';
import { inject, Inject, Injectable, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MytranslateService {

  private renderer2=inject(RendererFactory2).createRenderer(null, null); 

  constructor( private translateService: TranslateService) {
         this.translateService.setDefaultLang('en');
        const savedLang = localStorage.getItem('lang');
        if (savedLang) {
          this.translateService.use(savedLang);
        }
        this.changeDirection();
   
     
  }

  changeDirection(lang?:string):void {
    if(localStorage.getItem("lang")==="en"){
      this.renderer2.setAttribute(document.documentElement, 'dir', 'ltr'); 
      this.renderer2.setAttribute(document.documentElement, 'lang', 'en'); 
    }else if(localStorage.getItem("lang")==="ar"){
      this.renderer2.setAttribute(document.documentElement, 'dir', 'rtl');
      this.renderer2.setAttribute(document.documentElement, 'lang', 'ar'); 
    }
  }
  changeLanguage(lang: string): void {
    this.translateService.use(lang);
    localStorage.setItem('lang', lang);
    this.changeDirection(lang);
  }
}

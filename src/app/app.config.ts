import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
import {  provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { errorInterceptor } from '../../projects/shared-utils/src/public-api';
import { headerInterceptor } from './core/interceptors/header.interceptor';
import { loadingInterceptor } from '../../projects/shared-utils/src/lib/loading.interceptor';
 
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideHttpClient(withInterceptors([errorInterceptor,headerInterceptor,loadingInterceptor])),
     provideAnimations() ,
    provideToastr(),
     
    ]
};

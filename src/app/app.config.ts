import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
import { HttpClient, httpResource, provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from '../../projects/shared-utils/src/public-api';
import { headerInterceptor } from './core/interceptors/header.interceptor';
import { loadingInterceptor } from '../../projects/shared-utils/src/lib/loading.interceptor';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/i18n/', '.json');
}


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideHttpClient(withInterceptors([errorInterceptor,headerInterceptor,loadingInterceptor])),
     provideAnimations() ,
    provideToastr(),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    )
    
     
    ]
};

import { headerInterceptor } from './core/interceptors/header-interceptor';
import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { errorsInterceptor } from './core/interceptors/errors-interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingspinnerInterceptor } from './core/interceptors/loadingspinner-interceptor';
import { provideTranslateService } from '@ngx-translate/core';
import {provideTranslateHttpLoader} from "@ngx-translate/http-loader";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,
      // withInMemoryScrolling({scrollPositionRestoration:"top"}),
       withViewTransitions()),
        provideClientHydration(withEventReplay()),
        provideHttpClient(withFetch(),withInterceptors([headerInterceptor,errorsInterceptor,loadingspinnerInterceptor])),
        provideToastr(),
        importProvidersFrom(NgxSpinnerModule),
        provideTranslateService({
         loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json'
        }),
        fallbackLang: 'ar',
        lang: 'en'
    }),
    
  ]
};

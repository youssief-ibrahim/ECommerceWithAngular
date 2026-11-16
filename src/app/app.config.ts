import { headerInterceptor } from './core/interceptors/header-interceptor';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,
      // withInMemoryScrolling({scrollPositionRestoration:"top"}),
       withViewTransitions()),
        provideClientHydration(withEventReplay()),
        provideHttpClient(withFetch(),withInterceptors([headerInterceptor])),
        provideToastr(),
  ]
};

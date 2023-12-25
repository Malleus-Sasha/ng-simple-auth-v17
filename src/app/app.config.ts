import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // importProvidersFrom(HttpClientModule),
    // { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true }
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
  ]
};

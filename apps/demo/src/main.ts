import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER, enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideStore } from '@ngxs/store';
import { appStateFeatures, appStateOptions, appStates } from './app/app-states';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { AppService, appInitializer } from './app/app.service';
import { HttpRequestInterceptor } from './app/services/http-request.interceptor';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideStore(appStates, appStateOptions, ...appStateFeatures),
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [AppService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
  ],
}).catch(err => console.error(err));

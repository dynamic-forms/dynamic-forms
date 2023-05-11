import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { AppService, appInitializer } from './app/app.service';
import { IconService } from './app/services/icon.service';
import { HttpRequestInterceptor } from './app/services/http-request.interceptor';
import { environment } from './environments/environment';
import { AppStateModule } from './app/app-state.module';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, BrowserAnimationsModule, HttpClientModule, AppStateModule),
    provideRouter(appRoutes, withComponentInputBinding()),
    AppService,
    IconService,
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

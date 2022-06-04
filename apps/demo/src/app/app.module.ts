import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppStateModule } from './app-state.module';
import { AppComponent } from './app.component';
import { appInitializer, AppService } from './app.service';
import { DocsModule } from './docs/docs.module';
import { HomeModule } from './home/home.module';
import { LayoutModule } from './layout/layout.module';
import { HttpRequestInterceptor } from './services/http-request.interceptor';
import { IconService } from './services/icon.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AppStateModule,
    LayoutModule,
    HomeModule,
    DocsModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
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
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {}

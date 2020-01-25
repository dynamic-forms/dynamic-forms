import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appConfig, APP_CONFIG } from './app-config';
import { AppRoutingModule } from './app-routing.module';
import { AppStateModule } from './app-state.module';
import { AppComponent } from './app.component';
import { DocsModule } from './docs/docs.module';
import { HomeModule } from './home/home.module';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AppStateModule,
    LayoutModule,
    HomeModule,
    DocsModule
  ],
  providers: [
    {
      provide: APP_CONFIG,
      useValue: appConfig
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}

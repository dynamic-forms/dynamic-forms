import { NgModule } from '@angular/core';
import { ContentModule } from './content/content.module';
import { NavbarModule } from './navbar/navbar.module';

@NgModule({
  imports: [
    ContentModule,
    NavbarModule
  ],
  exports: [
    ContentModule,
    NavbarModule
  ]
})
export class LayoutModule {}

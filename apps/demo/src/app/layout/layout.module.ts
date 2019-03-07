import { NgModule } from '@angular/core';
import { ContentModule } from './content/content.module';
import { NavbarModule } from './navbar/navbar.module';
import { ProgressModule } from './progress/progress.module';

@NgModule({
  imports: [
    NavbarModule,
    ContentModule,
    ProgressModule
  ],
  exports: [
    NavbarModule,
    ContentModule,
    ProgressModule
  ]
})
export class LayoutModule {}

import { NgModule } from '@angular/core';
import { MarkdownModule } from '../markdown/markdown.module';
import { LicenseRoutingModule } from './license-routing.module';
import { LicenseComponent } from './license.component';

@NgModule({
  declarations: [
    LicenseComponent,
  ],
  imports: [
    LicenseRoutingModule,
    MarkdownModule,
  ],
})
export class LicenseModule {}

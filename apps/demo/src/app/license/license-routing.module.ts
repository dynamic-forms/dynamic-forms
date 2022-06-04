import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LicenseComponent } from './license.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LicenseComponent,
      },
    ]),
  ],
  exports: [
    RouterModule,
  ],
})
export class LicenseRoutingModule {}

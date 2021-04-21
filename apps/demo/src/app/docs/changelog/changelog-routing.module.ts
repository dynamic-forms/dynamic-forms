import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChangelogComponent } from './changelog.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ChangelogComponent
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class ChangelogRoutingModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { ContentComponent } from './content.component';
import { SidebarModule } from './sidebar/sidebar.module';

@NgModule({
  declarations: [
    ContentComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatSidenavModule,
    SidebarModule,
    RouterModule
  ],
  exports: [
    ContentComponent
  ]
})
export class ContentModule {}

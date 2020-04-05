import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './footer.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule
  ],
  declarations: [
    FooterComponent
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule {}

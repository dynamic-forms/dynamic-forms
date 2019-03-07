import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressComponent } from './progress.component';

@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule
  ],
  declarations: [
    ProgressComponent
  ],
  exports: [
    ProgressComponent
  ]
})
export class ProgressModule {}

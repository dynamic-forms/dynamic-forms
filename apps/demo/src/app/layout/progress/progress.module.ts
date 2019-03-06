import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxsModule } from '@ngxs/store';
import { ProgressComponent } from './progress.component';
import { ProgressState } from './progress.state';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([
      ProgressState,
    ]),
    MatProgressSpinnerModule
  ],
  declarations: [
    ProgressComponent
  ],
  exports: [
    ProgressComponent
  ]
})
export class ProgressModule {}

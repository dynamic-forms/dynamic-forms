import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormElementModule } from '@dynamic-forms/core';
import { BsDynamicFormDialogComponent } from './dynamic-form-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    DynamicFormElementModule
  ],
  declarations: [
    BsDynamicFormDialogComponent
  ],
  exports: [
    BsDynamicFormDialogComponent
  ]
})
export class BsDynamicFormDialogModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { DynamicFormElementModule } from '@dynamic-forms/core';
import { MatDynamicFormDialogComponent } from './dynamic-form-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    DynamicFormElementModule
  ],
  declarations: [
    MatDynamicFormDialogComponent
  ],
  exports: [
    MatDynamicFormDialogComponent
  ]
})
export class MatDynamicFormDialogModule {}

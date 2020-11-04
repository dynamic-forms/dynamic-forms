import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { dynamicFormDialogFactory, DynamicFormActionType, DynamicFormConfigModule,
  DynamicFormDialogModule, DynamicFormElementModule } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormDialogComponent } from './dynamic-form-dialog.component';

export const matDynamicFormDialogType: DynamicFormActionType = {
  type: 'dialog',
  factory: dynamicFormDialogFactory,
  component: MatDynamicFormDialogComponent,
  libraryName: matDynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    DynamicFormElementModule,
    DynamicFormDialogModule,
    DynamicFormConfigModule.withAction(matDynamicFormDialogType)
  ],
  declarations: [
    MatDynamicFormDialogComponent
  ],
  exports: [
    DynamicFormConfigModule,
    MatDynamicFormDialogComponent
  ],
  entryComponents: [
    MatDynamicFormDialogComponent
  ]
})
export class MatDynamicFormDialogModule {}

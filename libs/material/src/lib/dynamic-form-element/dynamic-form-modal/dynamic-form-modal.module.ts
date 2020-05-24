import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { dynamicFormModalFactory, DynamicFormConfigModule, DynamicFormElementModule,
  DynamicFormElementType, DynamicFormModalModule } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormModalComponent } from './dynamic-form-modal.component';

export const matDynamicFormModalType: DynamicFormElementType = {
  type: 'modal',
  factory: dynamicFormModalFactory,
  component: MatDynamicFormModalComponent,
  libraryName: matDynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    DynamicFormElementModule,
    DynamicFormModalModule,
    DynamicFormConfigModule.withElement(matDynamicFormModalType),
    MatDialogModule
  ],
  declarations: [
    MatDynamicFormModalComponent
  ],
  exports: [
    DynamicFormConfigModule,
    MatDynamicFormModalComponent
  ],
  entryComponents: [
    MatDynamicFormModalComponent
  ]
})
export class MatDynamicFormModalModule {}

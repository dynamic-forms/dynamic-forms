import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { dynamicFormDialogFactory, DynamicFormActionType, DynamicFormConfigModule,
  DynamicFormDialogModule, DynamicFormElementModule } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormDialogComponent } from './dynamic-form-dialog.component';

export const bsDynamicFormDialogType: DynamicFormActionType = {
  type: 'dialog',
  factory: dynamicFormDialogFactory,
  component: BsDynamicFormDialogComponent,
  libraryName: bsDynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    DynamicFormElementModule,
    DynamicFormDialogModule,
    DynamicFormConfigModule.withAction(bsDynamicFormDialogType)
  ],
  declarations: [
    BsDynamicFormDialogComponent
  ],
  exports: [
    DynamicFormConfigModule,
    BsDynamicFormDialogComponent
  ],
  entryComponents: [
    BsDynamicFormDialogComponent
  ]
})
export class BsDynamicFormDialogModule {}

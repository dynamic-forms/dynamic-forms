import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { dynamicFormModalFactory, DynamicFormConfigModule, DynamicFormElementModule,
  DynamicFormElementType, DynamicFormModalModule } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormModalComponent } from './dynamic-form-modal.component';

export const bsDynamicFormModalType: DynamicFormElementType = {
  type: 'modal',
  factory: dynamicFormModalFactory,
  component: BsDynamicFormModalComponent,
  libraryName: bsDynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    DynamicFormElementModule,
    DynamicFormModalModule,
    DynamicFormConfigModule.withElement(bsDynamicFormModalType)
  ],
  declarations: [
    BsDynamicFormModalComponent
  ],
  exports: [
    DynamicFormConfigModule,
    BsDynamicFormModalComponent
  ]
})
export class BsDynamicFormModalModule {}

import { NgModule } from '@angular/core';
import { DynamicFormConfigModule, DynamicFormElementType, DynamicFormModalModule, dynamicFormModalFactory } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormModalComponent } from './dynamic-form-modal.component';

export const bsDynamicFormModalType: DynamicFormElementType = {
  type: 'modal',
  factory: dynamicFormModalFactory,
  component: BsDynamicFormModalComponent,
  libraryName: bsDynamicFormLibrary.name,
};

@NgModule({
  imports: [DynamicFormModalModule, DynamicFormConfigModule.withElement(bsDynamicFormModalType)],
  exports: [DynamicFormConfigModule],
})
export class BsDynamicFormModalModule {}

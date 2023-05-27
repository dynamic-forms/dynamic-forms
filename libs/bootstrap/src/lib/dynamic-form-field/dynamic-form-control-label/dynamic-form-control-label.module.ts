import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormConfigModule, DynamicFormFieldWrapperType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormControlLabelComponent } from './dynamic-form-control-label.component';

export const bsDynamicFormControlLabelType: DynamicFormFieldWrapperType = {
  type: 'label',
  component: BsDynamicFormControlLabelComponent,
  libraryName: bsDynamicFormLibrary.name,
};

@NgModule({
  imports: [
    CommonModule,
    DynamicFormConfigModule.withFieldWrapper(bsDynamicFormControlLabelType),
  ],
  exports: [
    DynamicFormConfigModule,
  ],
})
export class BsDynamicFormControlLabelModule {}

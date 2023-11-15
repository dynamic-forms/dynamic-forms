import { NgModule } from '@angular/core';
import { DynamicFormConfigModule, DynamicFormFieldWrapperType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormControlHintsComponent } from './dynamic-form-control-hints.component';

export const bsDynamicFormControlHintsType: DynamicFormFieldWrapperType = {
  type: 'hints',
  component: BsDynamicFormControlHintsComponent,
  libraryName: bsDynamicFormLibrary.name,
};

@NgModule({
  imports: [DynamicFormConfigModule.withFieldWrapper(bsDynamicFormControlHintsType)],
  exports: [DynamicFormConfigModule],
})
export class BsDynamicFormControlHintsModule {}

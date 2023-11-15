import { NgModule } from '@angular/core';
import { DynamicFormConfigModule, DynamicFormFieldWrapperType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormControlErrorsComponent } from './dynamic-form-control-errors.component';

export const bsDynamicFormControlErrorsType: DynamicFormFieldWrapperType = {
  type: 'errors',
  component: BsDynamicFormControlErrorsComponent,
  libraryName: bsDynamicFormLibrary.name,
};

@NgModule({
  imports: [DynamicFormConfigModule.withFieldWrapper(bsDynamicFormControlErrorsType)],
  exports: [DynamicFormConfigModule],
})
export class BsDynamicFormControlErrorsModule {}

import { NgModule } from '@angular/core';
import { DynamicFormFieldWrapperType, importDynamicFormsProviders, withDynamicFormFieldWrappers } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormControlErrorsComponent } from './dynamic-form-control-errors.component';

export const bsDynamicFormControlErrorsType: DynamicFormFieldWrapperType = {
  type: 'errors',
  component: BsDynamicFormControlErrorsComponent,
  libraryName: bsDynamicFormLibrary.name,
};

/**
 * @deprecated Use {@link withBsDynamicFormFieldWrapperDefaultFeatures} instead.
 */
@NgModule({ providers: importDynamicFormsProviders(withDynamicFormFieldWrappers(bsDynamicFormControlErrorsType)) })
export class BsDynamicFormControlErrorsModule {}

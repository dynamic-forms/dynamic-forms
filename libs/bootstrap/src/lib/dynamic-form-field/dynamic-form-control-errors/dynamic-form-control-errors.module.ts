import { NgModule } from '@angular/core';
import {
  DynamicFormConfigModule,
  DynamicFormFieldWrapperType,
  importDynamicFormsProviders,
  withDynamicFormFieldWrappers,
} from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormControlErrorsComponent } from './dynamic-form-control-errors.component';

export const bsDynamicFormControlErrorsType: DynamicFormFieldWrapperType = {
  type: 'errors',
  component: BsDynamicFormControlErrorsComponent,
  libraryName: bsDynamicFormLibrary.name,
};

const modules = [DynamicFormConfigModule];

/**
 * @deprecated Use {@link withBsDynamicFormFieldWrapperDefaultFeatures} instead.
 */
@NgModule({
  imports: modules,
  exports: modules,
  providers: importDynamicFormsProviders(withDynamicFormFieldWrappers(bsDynamicFormControlErrorsType)),
})
export class BsDynamicFormControlErrorsModule {}

import { NgModule } from '@angular/core';
import {
  DynamicFormConfigModule,
  DynamicFormFieldWrapperType,
  importDynamicFormsProviders,
  withDynamicFormFieldWrappers,
} from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormControlHintsComponent } from './dynamic-form-control-hints.component';

export const bsDynamicFormControlHintsType: DynamicFormFieldWrapperType = {
  type: 'hints',
  component: BsDynamicFormControlHintsComponent,
  libraryName: bsDynamicFormLibrary.name,
};

const modules = [DynamicFormConfigModule];

/**
 * @deprecated Use {@link withBsDynamicFormFieldWrapperDefaultFeatures} instead.
 */
@NgModule({
  imports: modules,
  exports: modules,
  providers: importDynamicFormsProviders(withDynamicFormFieldWrappers(bsDynamicFormControlHintsType)),
})
export class BsDynamicFormControlHintsModule {}

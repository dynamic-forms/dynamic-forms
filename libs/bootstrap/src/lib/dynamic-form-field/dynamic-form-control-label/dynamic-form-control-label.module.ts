import { NgModule } from '@angular/core';
import {
  DynamicFormConfigModule,
  DynamicFormFieldWrapperType,
  importDynamicFormsProviders,
  withDynamicFormFieldWrappers,
} from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormControlLabelComponent } from './dynamic-form-control-label.component';

export const bsDynamicFormControlLabelType: DynamicFormFieldWrapperType = {
  type: 'label',
  component: BsDynamicFormControlLabelComponent,
  libraryName: bsDynamicFormLibrary.name,
};

const modules = [DynamicFormConfigModule];

/**
 * @deprecated Use {@link withBsDynamicFormFieldWrapperDefaultFeatures} instead.
 */
@NgModule({
  imports: modules,
  exports: modules,
  providers: importDynamicFormsProviders(withDynamicFormFieldWrappers(bsDynamicFormControlLabelType)),
})
export class BsDynamicFormControlLabelModule {}

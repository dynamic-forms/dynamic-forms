import { NgModule } from '@angular/core';
import { DynamicFormsFeature, withDynamicFormFieldWrappers } from '@dynamic-forms/core';
import {
  BsDynamicFormControlErrorsModule,
  bsDynamicFormControlErrorsType,
} from './dynamic-form-control-errors/dynamic-form-control-errors.module';
import {
  BsDynamicFormControlHintsModule,
  bsDynamicFormControlHintsType,
} from './dynamic-form-control-hints/dynamic-form-control-hints.module';
import {
  BsDynamicFormControlLabelModule,
  bsDynamicFormControlLabelType,
} from './dynamic-form-control-label/dynamic-form-control-label.module';

export const bsDynamicFormFieldWrapperTypes = [
  bsDynamicFormControlErrorsType,
  bsDynamicFormControlHintsType,
  bsDynamicFormControlLabelType,
];

export function withBsDynamicFormFieldWrapperDefaultFeatures(): DynamicFormsFeature[] {
  return [withDynamicFormFieldWrappers(...bsDynamicFormFieldWrapperTypes)];
}

const modules = [BsDynamicFormControlErrorsModule, BsDynamicFormControlHintsModule, BsDynamicFormControlLabelModule];

/**
 * @deprecated Use {@link withBsDynamicFormFieldWrapperDefaultFeatures} instead.
 */
@NgModule({
  imports: modules,
  exports: modules,
})
export class BsDynamicFormFieldWrapperModule {}

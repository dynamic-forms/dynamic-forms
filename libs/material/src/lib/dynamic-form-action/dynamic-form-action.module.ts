import { NgModule } from '@angular/core';
import {
  DynamicFormActionModule,
  DynamicFormConfigModule,
  DynamicFormsFeature,
  importDynamicFormsProviders,
  withDynamicFormActions,
} from '@dynamic-forms/core';
import { matDynamicFormButtonType } from './dynamic-form-button/dynamic-form-button-type';
import { matDynamicFormIconType } from './dynamic-form-icon/dynamic-form-icon-type';

export const matDynamicFormActionTypes = [matDynamicFormButtonType, matDynamicFormIconType];

export function withMatDynamicFormActionDefaultFeatures(): DynamicFormsFeature[] {
  return [withDynamicFormActions(...matDynamicFormActionTypes)];
}

const modules = [DynamicFormActionModule, DynamicFormConfigModule];

/**
 * @deprecated Use {@link withMatDynamicFormActionDefaultFeatures} instead.
 */
@NgModule({
  imports: modules,
  exports: modules,
  providers: importDynamicFormsProviders(...withMatDynamicFormActionDefaultFeatures()),
})
export class MatDynamicFormActionModule {}

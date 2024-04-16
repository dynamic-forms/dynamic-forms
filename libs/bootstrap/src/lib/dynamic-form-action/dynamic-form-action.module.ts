import { NgModule } from '@angular/core';
import { DynamicFormsFeature, importDynamicFormsProviders, withDynamicFormActions } from '@dynamic-forms/core';
import { bsDynamicFormButtonType } from './dynamic-form-button/dynamic-form-button-type';
import { bsDynamicFormIconType } from './dynamic-form-icon/dynamic-form-icon-type';

export const bsDynamicFormActionTypes = [bsDynamicFormButtonType, bsDynamicFormIconType];

export function withBsDynamicFormActionDefaultFeatures(): DynamicFormsFeature[] {
  return [withDynamicFormActions(...bsDynamicFormActionTypes)];
}

/**
 * @deprecated Use {@link withBsDynamicFormActionDefaultFeatures} instead.
 */
@NgModule({ providers: importDynamicFormsProviders(...withBsDynamicFormActionDefaultFeatures()) })
export class BsDynamicFormActionModule {}

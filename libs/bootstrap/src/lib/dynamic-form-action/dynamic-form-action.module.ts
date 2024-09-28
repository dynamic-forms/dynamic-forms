import { DynamicFormsFeature, withDynamicFormActions } from '@dynamic-forms/core';
import { bsDynamicFormButtonType } from './dynamic-form-button/dynamic-form-button-type';
import { bsDynamicFormIconType } from './dynamic-form-icon/dynamic-form-icon-type';

export const bsDynamicFormActionTypes = [bsDynamicFormButtonType, bsDynamicFormIconType];

export function withBsDynamicFormActionDefaultFeatures(): DynamicFormsFeature[] {
  return [withDynamicFormActions(...bsDynamicFormActionTypes)];
}

import { DynamicFormsFeature, withDynamicFormActions } from '@dynamic-forms/core';
import { matDynamicFormButtonType } from './dynamic-form-button/dynamic-form-button-type';
import { matDynamicFormIconType } from './dynamic-form-icon/dynamic-form-icon-type';

export const matDynamicFormActionTypes = [matDynamicFormButtonType, matDynamicFormIconType];

export function withMatDynamicFormActionDefaultFeatures(): DynamicFormsFeature[] {
  return [withDynamicFormActions(...matDynamicFormActionTypes)];
}

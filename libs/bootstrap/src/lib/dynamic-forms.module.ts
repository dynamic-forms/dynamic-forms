import { Provider } from '@angular/core';
import {
  DynamicFormIdBuilder,
  DynamicFormsFeature,
  provideDynamicForms,
  provideDynamicFormsWithDefaultFeatures,
  withDynamicFormValidation,
  withDynamicFormsIdBuilder,
  withDynamicFormsTheme,
} from '@dynamic-forms/core';
import { withBsDynamicFormActionDefaultFeatures } from './dynamic-form-action/dynamic-form-action.module';
import { withBsDynamicFormElementDefaultFeatures } from './dynamic-form-element/dynamic-form-element.module';
import { withBsDynamicFormFieldWrapperDefaultFeatures } from './dynamic-form-field/dynamic-form-field-wrapper.module';
import { withBsDynamicFormInputDefaultFeatures } from './dynamic-form-input/dynamic-form-input.module';
import { bsDynamicFormLibrary } from './dynamic-form-library/dynamic-form-library';

export function provideBsDynamicForms(...features: DynamicFormsFeature[]): Provider[] {
  return [provideDynamicForms(bsDynamicFormLibrary, ...features)];
}

export const bsDynamicFormsDefaultFeatures: DynamicFormsFeature[] = [
  withDynamicFormValidation(),
  ...withBsDynamicFormActionDefaultFeatures(),
  ...withBsDynamicFormElementDefaultFeatures(),
  ...withBsDynamicFormFieldWrapperDefaultFeatures(),
  ...withBsDynamicFormInputDefaultFeatures(),
];

function getDynamicFormsFeatures(config?: { theme?: string; idBuilder?: DynamicFormIdBuilder }): DynamicFormsFeature[] {
  const features = [];
  if (config?.theme) {
    features.push(withDynamicFormsTheme(config?.theme));
  }
  if (config?.idBuilder) {
    features.push(withDynamicFormsIdBuilder(config?.idBuilder));
  }
  return features;
}

export function provideBsDynamicFormsWithDefaultFeatures(
  config?: { theme?: string; idBuilder?: DynamicFormIdBuilder },
  ...additionalFeatures: DynamicFormsFeature[]
): Provider[] {
  const features = [...bsDynamicFormsDefaultFeatures, ...getDynamicFormsFeatures(config), ...additionalFeatures];
  return provideDynamicFormsWithDefaultFeatures(bsDynamicFormLibrary, ...features);
}

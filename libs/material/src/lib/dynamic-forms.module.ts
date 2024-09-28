import { Provider } from '@angular/core';
import {
  DynamicFormIdBuilder,
  DynamicFormValidationConfig,
  DynamicFormsFeature,
  provideDynamicForms,
  provideDynamicFormsWithDefaultFeatures,
  withDynamicFormValidationDefaults,
  withDynamicFormsIdBuilder,
  withDynamicFormsTheme,
} from '@dynamic-forms/core';
import { withMatDynamicFormActionDefaultFeatures } from './dynamic-form-action/dynamic-form-action.module';
import { withMatDynamicFormElementDefaultFeatures } from './dynamic-form-element/dynamic-form-element.module';
import { withMatDynamicFormInputDefaultFeatures } from './dynamic-form-input/dynamic-form-input.module';
import { matDynamicFormLibrary } from './dynamic-form-library/dynamic-form-library';

export function provideMatDynamicForms(...features: DynamicFormsFeature[]): Provider[] {
  return [provideDynamicForms(matDynamicFormLibrary, ...features)];
}

export const matDynamicFormValidationConfig: DynamicFormValidationConfig = {
  aliases: {
    matDatepickerMin: 'minDate',
    matDatepickerMax: 'maxDate',
  },
  libraryName: matDynamicFormLibrary.name,
};

export const matDynamicFormsDefaultFeatures: DynamicFormsFeature[] = [
  ...withDynamicFormValidationDefaults(matDynamicFormValidationConfig),
  ...withMatDynamicFormActionDefaultFeatures(),
  ...withMatDynamicFormElementDefaultFeatures(),
  ...withMatDynamicFormInputDefaultFeatures(),
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

export function provideMatDynamicFormsWithDefaultFeatures(
  config?: { theme?: string; idBuilder?: DynamicFormIdBuilder },
  ...additionalFeatures: DynamicFormsFeature[]
): Provider[] {
  const features = [...matDynamicFormsDefaultFeatures, ...getDynamicFormsFeatures(config), ...additionalFeatures];
  return provideDynamicFormsWithDefaultFeatures(matDynamicFormLibrary, ...features);
}

import { NgModule, Provider } from '@angular/core';
import { DynamicFormComponentFactory } from './dynamic-form/dynamic-form-component.factory';
import { DynamicFormBuilder } from './dynamic-form/dynamic-form.builder';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { dynamicFormActionProviders } from './dynamic-form-action/dynamic-form-action.module';
import { dynamicFormIconProviders } from './dynamic-form-action/dynamic-form-icon/dynamic-form-icon.module';
import { withDynamicFormArrayDefaultFeatures } from './dynamic-form-array/dynamic-form-array.module';
import { dynamicFormConfigProviders } from './dynamic-form-config/dynamic-form-config.module';
import { withDynamicFormControlDefaultFeatures } from './dynamic-form-control/dynamic-form-control.module';
import { withDynamicFormElementDefaultFeatures } from './dynamic-form-element/dynamic-form-element.module';
import { dynamicFormErrorProviders } from './dynamic-form-error/dynamic-form-error.module';
import { dynamicFormEvaluationProviders } from './dynamic-form-evaluation/dynamic-form-evaluation.module';
import { DynamicFormExpressionBuilder } from './dynamic-form-expression/dynamic-form-expression.builder';
import { withDynamicFormFieldDefaultFeatures } from './dynamic-form-field/dynamic-form-field.module';
import { withDynamicFormGroupDefaultFeatures } from './dynamic-form-group/dynamic-form-group.module';
import { DYNAMIC_FORM_LIBRARY, DynamicFormLibrary } from './dynamic-form-library/dynamic-form-library';
import { dynamicFormLibraryProviders } from './dynamic-form-library/dynamic-form-library.module';
import { dynamicFormThemeProviders } from './dynamic-form-theme/dynamic-form-theme.module';
import { dynamicFormValidationProviders } from './dynamic-form-validation/dynamic-form-validation.module';
import { DynamicFormsFeature } from './dynamic-forms-feature';

const dynamicFormProviders: Provider[] = [
  DynamicFormBuilder,
  DynamicFormComponentFactory,
  DynamicFormExpressionBuilder,
  ...dynamicFormLibraryProviders,
  ...dynamicFormConfigProviders,
  ...dynamicFormActionProviders,
  ...dynamicFormEvaluationProviders,
  ...dynamicFormValidationProviders,
  ...dynamicFormErrorProviders,
  ...dynamicFormIconProviders,
  ...dynamicFormThemeProviders,
];

export const dynamicFormsDefaultFeatures: DynamicFormsFeature[] = [
  ...withDynamicFormArrayDefaultFeatures(),
  ...withDynamicFormControlDefaultFeatures(),
  ...withDynamicFormElementDefaultFeatures(),
  ...withDynamicFormFieldDefaultFeatures(),
  ...withDynamicFormGroupDefaultFeatures(),
];

export function importDynamicFormsProviders(...features: DynamicFormsFeature[]): Provider[] {
  const providers = features.reduce((result, feature) => {
    result.push(...feature.providers);
    return result;
  }, [] as Provider[]);
  return providers;
}

export function provideDynamicForms(library?: DynamicFormLibrary, ...features: DynamicFormsFeature[]): Provider[] {
  const providers = [...dynamicFormProviders];
  if (library) {
    providers.push({ provide: DYNAMIC_FORM_LIBRARY, useValue: library });
  }
  if (features) {
    providers.push(...importDynamicFormsProviders(...features));
  }
  return providers;
}

export function provideDynamicFormsWithDefaultFeatures(
  library?: DynamicFormLibrary,
  ...additionalFeatures: DynamicFormsFeature[]
): Provider[] {
  const features = [...dynamicFormsDefaultFeatures, ...additionalFeatures];
  return provideDynamicForms(library, ...features);
}

/**
 * @deprecated Use {@link provideDynamicForms} in combination with standalone component {@link DynamicFormComponent} instead.
 */
@NgModule({
  imports: [DynamicFormComponent],
  exports: [DynamicFormComponent],
  providers: provideDynamicForms(),
})
export class DynamicFormsModule {}

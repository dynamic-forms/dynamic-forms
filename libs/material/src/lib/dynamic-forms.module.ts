import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import {
  DynamicFormComponent,
  DynamicFormIdBuilder,
  DynamicFormsFeature,
  importDynamicFormsProviders,
  provideDynamicForms,
  provideDynamicFormsWithDefaultFeatures,
  withDynamicFormValidation,
  withDynamicFormsIdBuilder,
  withDynamicFormsLibrary,
  withDynamicFormsTheme,
} from '@dynamic-forms/core';
import { withMatDynamicFormActionDefaultFeatures } from './dynamic-form-action/dynamic-form-action.module';
import { withMatDynamicFormElementDefaultFeatures } from './dynamic-form-element/dynamic-form-element.module';
import { withMatDynamicFormInputDefaultFeatures } from './dynamic-form-input/dynamic-form-input.module';
import { matDynamicFormLibrary } from './dynamic-form-library/dynamic-form-library';

export function provideMatDynamicForms(...features: DynamicFormsFeature[]): Provider[] {
  return [provideDynamicForms(matDynamicFormLibrary, ...features)];
}

export const matDynamicFormsDefaultFeatures: DynamicFormsFeature[] = [
  withDynamicFormValidation(),
  ...withMatDynamicFormActionDefaultFeatures(),
  ...withMatDynamicFormElementDefaultFeatures(),
  ...withMatDynamicFormInputDefaultFeatures(),
];

export function provideMatDynamicFormsWithDefaultFeatures(
  config?: { theme?: string; idBuilder?: DynamicFormIdBuilder },
  ...additionalFatures: DynamicFormsFeature[]
): Provider[] {
  const features = [
    ...matDynamicFormsDefaultFeatures,
    withDynamicFormsTheme(config?.theme),
    withDynamicFormsIdBuilder(config?.idBuilder),
    ...additionalFatures,
  ];
  return provideDynamicFormsWithDefaultFeatures(matDynamicFormLibrary, ...features);
}

/**
 * @deprecated Use {@link provideMatDynamicFormsWithDefaultFeatures} instead.
 */
@NgModule({
  imports: [DynamicFormComponent],
  exports: [DynamicFormComponent],
  providers: provideDynamicFormsWithDefaultFeatures(null, ...matDynamicFormsDefaultFeatures, withDynamicFormValidation()),
})
export class MatDynamicFormsModule {
  /**
   * @deprecated Use {@link provideMatDynamicFormsWithDefaultFeatures} instead.
   */
  static forRoot(
    config?: { theme?: string; idBuilder?: DynamicFormIdBuilder },
    ...additionalFatures: DynamicFormsFeature[]
  ): ModuleWithProviders<MatDynamicFormsModule> {
    const features = [
      withDynamicFormsLibrary(matDynamicFormLibrary),
      withDynamicFormsTheme(config?.theme),
      withDynamicFormsIdBuilder(config?.idBuilder),
      ...additionalFatures,
    ];
    return { ngModule: MatDynamicFormsModule, providers: importDynamicFormsProviders(...features) };
  }
}

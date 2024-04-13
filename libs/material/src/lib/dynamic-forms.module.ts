import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import {
  DynamicFormArrayModule,
  DynamicFormControlModule,
  DynamicFormDictionaryModule,
  DynamicFormElementModule,
  DynamicFormGroupModule,
  DynamicFormIdBuilder,
  DynamicFormValidationModule,
  DynamicFormsFeature,
  DynamicFormsModule,
  dynamicFormsDefaultFeatures,
  importDynamicFormsProviders,
  provideDynamicForms,
  provideDynamicFormsWithDefaultFeatures,
  withDynamicFormValidation,
  withDynamicFormsIdBuilder,
  withDynamicFormsLibrary,
  withDynamicFormsTheme,
} from '@dynamic-forms/core';
import { MatDynamicFormActionModule, withMatDynamicFormActionDefaultFeatures } from './dynamic-form-action/dynamic-form-action.module';
import { MatDynamicFormElementModule, withMatDynamicFormElementDefaultFeatures } from './dynamic-form-element/dynamic-form-element.module';
import { MatDynamicFormInputModule, withMatDynamicFormInputDefaultFeatures } from './dynamic-form-input/dynamic-form-input.module';
import { matDynamicFormLibrary } from './dynamic-form-library/dynamic-form-library';

export function provideMatDynamicForms(...features: DynamicFormsFeature[]): Provider[] {
  return [provideDynamicForms(matDynamicFormLibrary, ...features)];
}

export const matDynamicFormsDefaultFeatures: DynamicFormsFeature[] = [
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

const modules = [
  DynamicFormArrayModule,
  DynamicFormControlModule,
  DynamicFormDictionaryModule,
  DynamicFormElementModule,
  DynamicFormGroupModule,
  DynamicFormsModule,
  DynamicFormValidationModule,
  MatDynamicFormActionModule,
  MatDynamicFormElementModule,
  MatDynamicFormInputModule,
];

/**
 * @deprecated Use {@link provideMatDynamicFormsWithDefaultFeatures} instead.
 */
@NgModule({
  imports: modules,
  exports: modules,
  providers: importDynamicFormsProviders(withDynamicFormValidation()),
})
export class MatDynamicFormsModule {
  /**
   * @deprecated Use {@link provideMatDynamicFormsWithDefaultFeatures} instead.
   */
  static forRoot(config?: { theme?: string; idBuilder?: DynamicFormIdBuilder }): ModuleWithProviders<MatDynamicFormsModule> {
    const features = [
      withDynamicFormsLibrary(matDynamicFormLibrary),
      withDynamicFormsTheme(config?.theme),
      withDynamicFormsIdBuilder(config?.idBuilder),
    ];
    return { ngModule: MatDynamicFormsModule, providers: importDynamicFormsProviders(...features) };
  }

  static withDefaultFeatures(
    config?: { theme?: string; idBuilder?: DynamicFormIdBuilder },
    ...additionalFatures: DynamicFormsFeature[]
  ): ModuleWithProviders<MatDynamicFormsModule> {
    const features = [
      ...dynamicFormsDefaultFeatures,
      ...matDynamicFormsDefaultFeatures,
      withDynamicFormsLibrary(matDynamicFormLibrary),
      withDynamicFormsTheme(config?.theme),
      withDynamicFormsIdBuilder(config?.idBuilder),
      ...additionalFatures,
    ];
    return { ngModule: MatDynamicFormsModule, providers: importDynamicFormsProviders(...features) };
  }
}

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

export function provideBsDynamicFormsWithDefaultFeatures(
  config?: { theme?: string; idBuilder?: DynamicFormIdBuilder },
  ...additionalFatures: DynamicFormsFeature[]
): Provider[] {
  const features = [
    ...bsDynamicFormsDefaultFeatures,
    withDynamicFormsTheme(config?.theme),
    withDynamicFormsIdBuilder(config?.idBuilder),
    ...additionalFatures,
  ];
  return provideDynamicFormsWithDefaultFeatures(bsDynamicFormLibrary, ...features);
}

/**
 * @deprecated Use {@link provideBsDynamicFormsWithDefaultFeatures} instead.
 */
@NgModule({
  imports: [DynamicFormComponent],
  exports: [DynamicFormComponent],
  providers: provideDynamicFormsWithDefaultFeatures(null, ...bsDynamicFormsDefaultFeatures, withDynamicFormValidation()),
})
export class BsDynamicFormsModule {
  /**
   * @deprecated Use {@link provideBsDynamicFormsWithDefaultFeatures} instead.
   */
  static forRoot(
    config?: { theme?: string; idBuilder?: DynamicFormIdBuilder },
    ...additionalFatures: DynamicFormsFeature[]
  ): ModuleWithProviders<BsDynamicFormsModule> {
    const features = [
      withDynamicFormsLibrary(bsDynamicFormLibrary),
      withDynamicFormsTheme(config?.theme),
      withDynamicFormsIdBuilder(config?.idBuilder),
      ...additionalFatures,
    ];
    return { ngModule: BsDynamicFormsModule, providers: importDynamicFormsProviders(...features) };
  }
}

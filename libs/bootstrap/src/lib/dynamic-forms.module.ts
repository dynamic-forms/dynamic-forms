import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import {
  DynamicFormActionModule,
  DynamicFormArrayModule,
  DynamicFormConfigModule,
  DynamicFormControlModule,
  DynamicFormDictionaryModule,
  DynamicFormElementModule,
  DynamicFormGroupModule,
  DynamicFormIdBuilder,
  DynamicFormThemeModule,
  DynamicFormValidationModule,
  DynamicFormsFeature,
  DynamicFormsModule,
  importDynamicFormsProviders,
  provideDynamicForms,
  provideDynamicFormsWithDefaultFeatures,
  withDynamicFormActionDefaultFeatures,
  withDynamicFormValidation,
  withDynamicFormsIdBuilder,
  withDynamicFormsLibrary,
  withDynamicFormsTheme,
} from '@dynamic-forms/core';
import { BsDynamicFormActionModule, withBsDynamicFormActionDefaultFeatures } from './dynamic-form-action/dynamic-form-action.module';
import { BsDynamicFormElementModule, withBsDynamicFormElementDefaultFeatures } from './dynamic-form-element/dynamic-form-element.module';
import {
  BsDynamicFormFieldWrapperModule,
  withBsDynamicFormFieldWrapperDefaultFeatures,
} from './dynamic-form-field/dynamic-form-field-wrapper.module';
import { BsDynamicFormInputModule, withBsDynamicFormInputDefaultFeatures } from './dynamic-form-input/dynamic-form-input.module';
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

const modules = [
  BsDynamicFormActionModule,
  BsDynamicFormElementModule,
  BsDynamicFormFieldWrapperModule,
  BsDynamicFormInputModule,
  DynamicFormActionModule,
  DynamicFormArrayModule,
  DynamicFormConfigModule,
  DynamicFormControlModule,
  DynamicFormDictionaryModule,
  DynamicFormElementModule,
  DynamicFormGroupModule,
  DynamicFormsModule,
  DynamicFormThemeModule,
  DynamicFormValidationModule,
];

/**
 * @deprecated Use {@link provideBsDynamicFormsWithDefaultFeatures} instead.
 */
@NgModule({
  imports: modules,
  exports: modules,
  providers: importDynamicFormsProviders(withDynamicFormValidation(), ...withDynamicFormActionDefaultFeatures()),
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

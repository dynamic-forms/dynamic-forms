import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { DynamicFormsFeature } from '../dynamic-forms-feature';
import { DYNAMIC_FORM_COLOR_CONFIGS, DynamicFormColorConfig } from './dynamic-form-color-config';
import { DynamicFormColorService } from './dynamic-form-color.service';

export const dynamicFormThemeProviders: Provider[] = [DynamicFormColorService];

export function withDynamicFormColors(colorConfig: DynamicFormColorConfig): DynamicFormsFeature {
  return { providers: [{ provide: DYNAMIC_FORM_COLOR_CONFIGS, useValue: colorConfig, multi: true }] };
}

/**
 * @deprecated Use {@link dynamicFormThemeProviders} instead.
 */
@NgModule({ providers: dynamicFormThemeProviders })
export class DynamicFormThemeModule {
  /**
   * @deprecated Use {@link withDynamicFormColors} instead.
   */
  static withColors(colorConfig: DynamicFormColorConfig): ModuleWithProviders<DynamicFormThemeModule> {
    const feature = withDynamicFormColors(colorConfig);
    return { ngModule: DynamicFormThemeModule, providers: feature.providers };
  }
}

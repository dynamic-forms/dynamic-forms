import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { DynamicFormsFeature } from '../../dynamic-forms-feature';
import { DYNAMIC_FORM_ICON_CONFIGS, DynamicFormIconConfig } from './dynamic-form-icon-config';
import { DynamicFormIconService } from './dynamic-form-icon.service';

export const dynamicFormIconProviders: Provider[] = [DynamicFormIconService];

export function withDynamicFormIcons(iconConfig: DynamicFormIconConfig): DynamicFormsFeature {
  const provider = { provide: DYNAMIC_FORM_ICON_CONFIGS, useValue: iconConfig, multi: true };
  return { providers: [provider] };
}

/**
 * @deprecated Use {@link dynamicFormIconProviders} instead.
 */
@NgModule({ providers: dynamicFormIconProviders })
export class DynamicFormIconModule {
  /**
   * @deprecated Use {@link withDynamicFormIcons} instead.
   */
  static withIcons(iconConfig: DynamicFormIconConfig): ModuleWithProviders<DynamicFormIconModule> {
    const feature = withDynamicFormIcons(iconConfig);
    return { ngModule: DynamicFormIconModule, providers: feature.providers };
  }
}

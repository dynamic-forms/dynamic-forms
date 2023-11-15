import { ModuleWithProviders, NgModule } from '@angular/core';
import { DYNAMIC_FORM_ICON_CONFIGS, DynamicFormIconConfig } from './dynamic-form-icon-config';
import { DynamicFormIconService } from './dynamic-form-icon.service';

@NgModule({
  providers: [DynamicFormIconService],
})
export class DynamicFormIconModule {
  static withIcons(iconConfig: DynamicFormIconConfig): ModuleWithProviders<DynamicFormIconModule> {
    return {
      ngModule: DynamicFormIconModule,
      providers: [
        {
          provide: DYNAMIC_FORM_ICON_CONFIGS,
          useValue: iconConfig,
          multi: true,
        },
      ],
    };
  }
}

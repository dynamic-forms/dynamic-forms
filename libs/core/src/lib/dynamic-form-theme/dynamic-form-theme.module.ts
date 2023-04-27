import { ModuleWithProviders, NgModule } from '@angular/core';
import { DynamicFormColorConfig, DYNAMIC_FORM_COLOR_CONFIGS } from './dynamic-form-color-config';
import { DynamicFormColorService } from './dynamic-form-color.service';

@NgModule({
  providers: [
    DynamicFormColorService,
  ],
})
export class DynamicFormThemeModule {
  static withColors(colorConfig: DynamicFormColorConfig): ModuleWithProviders<DynamicFormThemeModule> {
    return {
      ngModule: DynamicFormThemeModule,
      providers: [
        {
          provide: DYNAMIC_FORM_COLOR_CONFIGS,
          useValue: colorConfig,
          multi: true,
        },
      ],
    };
  }
}

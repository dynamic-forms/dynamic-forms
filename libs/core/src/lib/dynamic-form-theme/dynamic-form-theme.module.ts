import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { DynamicFormColorConfig, DYNAMIC_FORM_COLOR_CONFIGS } from './dynamic-form-color-config';
import { DynamicFormColorPipe } from './dynamic-form-color.pipe';
import { DynamicFormColorService } from './dynamic-form-color.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    DynamicFormColorPipe,
  ],
  exports: [
    DynamicFormColorPipe,
  ],
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

import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { DynamicFormIconConfig, DYNAMIC_FORM_ICON_CONFIGS } from './dynamic-form-icon-config';
import { DynamicFormIconPipe } from './dynamic-form-icon.pipe';
import { DynamicFormIconService } from './dynamic-form-icon.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    DynamicFormIconPipe,
  ],
  exports: [
    DynamicFormIconPipe,
  ],
  providers: [
    DynamicFormIconService,
  ],
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

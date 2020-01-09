import { ModuleWithProviders, NgModule } from '@angular/core';
import { dynamicFormConfig, DynamicFormConfig, DYNAMIC_FORM_CONFIG, DYNAMIC_FORM_LIBRARY } from './dynamic-form-config';
import { DynamicFormConfigService } from './dynamic-form-config.service';

@NgModule({})
export class DynamicFormConfigModule {
  static forRoot(config: DynamicFormConfig = dynamicFormConfig): ModuleWithProviders<DynamicFormConfigModule> {
    return {
      ngModule: DynamicFormConfigModule,
      providers: [
        {
          provide: DYNAMIC_FORM_LIBRARY,
          useValue: 'core'
        },
        {
          provide: DYNAMIC_FORM_CONFIG,
          useValue: config,
          multi: true
        },
        DynamicFormConfigService
      ]
    };
  }

  static forChild(config: DynamicFormConfig): ModuleWithProviders<DynamicFormConfigModule> {
    return {
      ngModule: DynamicFormConfigModule,
      providers: [
        {
          provide: DYNAMIC_FORM_CONFIG,
          useValue: config,
          multi: true
        }
      ]
    };
  }
}

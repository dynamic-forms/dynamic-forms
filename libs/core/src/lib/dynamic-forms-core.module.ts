import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIG } from './dynamic-form/dynamic-form-config';
import { DynamicFormConfigService } from './dynamic-form/dynamic-form-config.service';
import { dynamicFormsCoreComponents, dynamicFormsCoreConfig,
  dynamicFormsCoreEntryComponents, dynamicFormsCoreServices } from './dynamic-forms-core.config';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...dynamicFormsCoreComponents,
    ...dynamicFormsCoreEntryComponents
  ],
  exports: [
    ...dynamicFormsCoreComponents,
    ...dynamicFormsCoreEntryComponents
  ],
  entryComponents: [
    ...dynamicFormsCoreEntryComponents
  ]
})
export class DynamicFormsCoreModule {
  static forRoot(config: DynamicFormConfig = dynamicFormsCoreConfig): ModuleWithProviders {
    return {
      ngModule: DynamicFormsCoreModule,
      providers: [
        {
          provide: DYNAMIC_FORM_CONFIG,
          useValue: config,
          multi: true
        },
        DynamicFormConfigService,
        ...dynamicFormsCoreServices
      ]
    };
  }
}

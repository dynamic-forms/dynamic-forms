import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIG, DYNAMIC_FORM_LIBRARY } from './dynamic-form/dynamic-form-config';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { dynamicFormConfig, dynamicFormProviders } from './dynamic-forms.config';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormModule
  ],
  exports: [
    DynamicFormModule
  ]
})
export class DynamicFormsModule {
  static forRoot(config: DynamicFormConfig = dynamicFormConfig): ModuleWithProviders {
    return {
      ngModule: DynamicFormsModule,
      providers: [
        { provide: DYNAMIC_FORM_LIBRARY, useValue: 'core' },
        { provide: DYNAMIC_FORM_CONFIG, useValue: config, multi: true },
        ...dynamicFormProviders
      ]
    };
  }

  static forChild(config: DynamicFormConfig): ModuleWithProviders {
    return {
      ngModule: DynamicFormsModule,
      providers: [
        { provide: DYNAMIC_FORM_CONFIG, useValue: config, multi: true }
      ]
    };
  }
}

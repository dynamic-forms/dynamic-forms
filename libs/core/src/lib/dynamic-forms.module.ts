import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormElementModule } from './dynamic-form-element/dynamic-form-element.module';
import { DynamicFormConfig } from './dynamic-form/dynamic-form-config';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { dynamicFormConfig, getDynamicFormProviders } from './dynamic-forms.config';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormElementModule,
    DynamicFormModule
  ],
  exports: [
    DynamicFormModule
  ]
})
export class DynamicFormsModule {
  static forRoot(config?: DynamicFormConfig): ModuleWithProviders {
    return {
      ngModule: DynamicFormsModule,
      providers: getDynamicFormProviders(dynamicFormConfig, config)
    };
  }

  static forChild(config: DynamicFormConfig): ModuleWithProviders {
    return {
      ngModule: DynamicFormsModule,
      providers: getDynamicFormProviders(dynamicFormConfig, config)
    };
  }
}

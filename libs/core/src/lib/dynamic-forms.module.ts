import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormArrayModule } from './dynamic-form-array/dynamic-form-array.module';
import { DynamicFormControlModule } from './dynamic-form-control/dynamic-form-control.module';
import { DynamicFormElementModule } from './dynamic-form-element/dynamic-form-element.module';
import { DynamicFormGroupModule } from './dynamic-form-group/dynamic-form-group.module';
import { DynamicFormConfig } from './dynamic-form/dynamic-form-config';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { dynamicFormConfig, getDynamicFormProviders } from './dynamic-forms.config';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormArrayModule,
    DynamicFormControlModule,
    DynamicFormElementModule,
    DynamicFormGroupModule,
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
}

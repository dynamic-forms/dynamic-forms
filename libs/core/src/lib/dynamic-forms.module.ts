import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { Provider } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { dynamicFormConfig, DynamicFormConfig, DYNAMIC_FORM_CONFIG, DYNAMIC_FORM_LIBRARY } from './dynamic-form-config/dynamic-form-config';
import { DynamicFormConfigService } from './dynamic-form-config/dynamic-form-config.service';
import { DynamicFormEvaluationBuilder } from './dynamic-form-evaluation/dynamic-form-evaluation.builder';
import { DynamicFormExpressionBuilder } from './dynamic-form-expression/dynamic-form-expression.builder';
import { DynamicFormValidationBuilder } from './dynamic-form-validation/dynamic-form-validation.builder';
import { DynamicFormValidationService } from './dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormComponentFactory } from './dynamic-form/dynamic-form-component.factory';
import { DynamicFormBuilder } from './dynamic-form/dynamic-form.builder';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';

export const dynamicFormProviders: Provider[] = [
  DynamicFormConfigService,
  DynamicFormBuilder,
  DynamicFormExpressionBuilder,
  DynamicFormEvaluationBuilder,
  DynamicFormValidationBuilder,
  DynamicFormValidationService,
  DynamicFormComponentFactory
];

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
  static forRoot(config: DynamicFormConfig = dynamicFormConfig): ModuleWithProviders<DynamicFormsModule> {
    return {
      ngModule: DynamicFormsModule,
      providers: [
        { provide: DYNAMIC_FORM_LIBRARY, useValue: 'core' },
        { provide: DYNAMIC_FORM_CONFIG, useValue: config, multi: true },
        ...dynamicFormProviders
      ]
    };
  }

  static forChild(config: DynamicFormConfig): ModuleWithProviders<DynamicFormsModule> {
    return {
      ngModule: DynamicFormsModule,
      providers: [
        { provide: DYNAMIC_FORM_CONFIG, useValue: config, multi: true }
      ]
    };
  }
}

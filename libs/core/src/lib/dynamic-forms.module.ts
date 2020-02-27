import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfigModule } from './dynamic-form-config/dynamic-form-config.module';
import { DynamicFormEvaluationBuilder } from './dynamic-form-evaluation/dynamic-form-evaluation.builder';
import { DynamicFormExpressionBuilder } from './dynamic-form-expression/dynamic-form-expression.builder';
import { DynamicFormValidationBuilder } from './dynamic-form-validation/dynamic-form-validation.builder';
import { DynamicFormValidationService } from './dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormComponentFactory } from './dynamic-form/dynamic-form-component.factory';
import { DynamicFormBuilder } from './dynamic-form/dynamic-form.builder';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormConfigModule,
    DynamicFormModule
  ],
  exports: [
    DynamicFormConfigModule,
    DynamicFormModule
  ],
  providers: [
    DynamicFormBuilder,
    DynamicFormExpressionBuilder,
    DynamicFormEvaluationBuilder,
    DynamicFormValidationBuilder,
    DynamicFormValidationService,
    DynamicFormComponentFactory
  ]
})
export class DynamicFormsModule {}

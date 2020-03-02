import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfigModule } from './dynamic-form-config/dynamic-form-config.module';
import { DynamicFormEvaluationBuilder } from './dynamic-form-evaluation/dynamic-form-evaluation.builder';
import { DynamicFormExpressionBuilder } from './dynamic-form-expression/dynamic-form-expression.builder';
import { DynamicFormLibraryModule } from './dynamic-form-library/dynamic-form-library.module';
import { DynamicFormValidationModule } from './dynamic-form-validation/dynamic-form-validation.module';
import { DynamicFormComponentFactory } from './dynamic-form/dynamic-form-component.factory';
import { DynamicFormBuilder } from './dynamic-form/dynamic-form.builder';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormLibraryModule,
    DynamicFormConfigModule,
    DynamicFormValidationModule,
    DynamicFormModule
  ],
  exports: [
    DynamicFormLibraryModule,
    DynamicFormConfigModule,
    DynamicFormValidationModule,
    DynamicFormModule
  ],
  providers: [
    DynamicFormBuilder,
    DynamicFormExpressionBuilder,
    DynamicFormEvaluationBuilder,
    DynamicFormComponentFactory
  ]
})
export class DynamicFormsModule {}

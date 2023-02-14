import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfigModule } from './dynamic-form-config/dynamic-form-config.module';
import { DynamicFormEvaluationModule } from './dynamic-form-evaluation/dynamic-form-evaluation.module';
import { DynamicFormExpressionBuilder } from './dynamic-form-expression/dynamic-form-expression.builder';
import { DynamicFormLibraryModule } from './dynamic-form-library/dynamic-form-library.module';
import { DynamicFormErrorModule } from './dynamic-form-error/dynamic-form-error.module';
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
    DynamicFormErrorModule,
    DynamicFormEvaluationModule,
    DynamicFormValidationModule,
    DynamicFormModule,
  ],
  exports: [
    DynamicFormLibraryModule,
    DynamicFormErrorModule,
    DynamicFormConfigModule,
    DynamicFormEvaluationModule,
    DynamicFormValidationModule,
    DynamicFormModule,
  ],
  providers: [
    DynamicFormBuilder,
    DynamicFormExpressionBuilder,
    DynamicFormComponentFactory,
  ],
})
export class DynamicFormsModule {}

import { NgModule } from '@angular/core';
import { DynamicFormComponentFactory } from './dynamic-form/dynamic-form-component.factory';
import { DynamicFormBuilder } from './dynamic-form/dynamic-form.builder';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicFormConfigModule } from './dynamic-form-config/dynamic-form-config.module';
import { DynamicFormErrorModule } from './dynamic-form-error/dynamic-form-error.module';
import { DynamicFormEvaluationModule } from './dynamic-form-evaluation/dynamic-form-evaluation.module';
import { DynamicFormExpressionBuilder } from './dynamic-form-expression/dynamic-form-expression.builder';
import { DynamicFormLibraryModule } from './dynamic-form-library/dynamic-form-library.module';
import { DynamicFormValidationModule } from './dynamic-form-validation/dynamic-form-validation.module';

@NgModule({
  imports: [
    DynamicFormComponent,
    DynamicFormConfigModule,
    DynamicFormErrorModule,
    DynamicFormEvaluationModule,
    DynamicFormLibraryModule,
    DynamicFormValidationModule,
  ],
  exports: [
    DynamicFormComponent,
    DynamicFormConfigModule,
    DynamicFormErrorModule,
    DynamicFormEvaluationModule,
    DynamicFormLibraryModule,
    DynamicFormValidationModule,
  ],
  providers: [DynamicFormBuilder, DynamicFormComponentFactory, DynamicFormExpressionBuilder],
})
export class DynamicFormsModule {}

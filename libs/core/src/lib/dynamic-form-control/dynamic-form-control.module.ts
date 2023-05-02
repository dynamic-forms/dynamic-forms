import { NgModule } from '@angular/core';
import { DynamicFormConfigModule } from '../dynamic-form-config/dynamic-form-config.module';
import { DynamicFormEvaluationModule } from '../dynamic-form-evaluation/dynamic-form-evaluation.module';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormFieldModule } from '../dynamic-form-field/dynamic-form-field.module';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormValidationModule } from '../dynamic-form-validation/dynamic-form-validation.module';
import { dynamicFormControlEvaluatorTypes } from './dynamic-form-control-evaluator-type';
import { dynamicFormControlFactory } from './dynamic-form-control-factory';
import { dynamicFormControlValidatorTypes } from './dynamic-form-control-validator-type';
import { DynamicFormControlComponent } from './dynamic-form-control.component';

export const dynamicFormControlType: DynamicFormFieldType = {
  type: 'control',
  factory: dynamicFormControlFactory,
  component: DynamicFormControlComponent,
  libraryName: dynamicFormLibrary.name,
};

@NgModule({
  imports: [
    DynamicFormFieldModule,
    DynamicFormConfigModule.withField(dynamicFormControlType),
    DynamicFormValidationModule.withControlValidators(dynamicFormControlValidatorTypes),
    DynamicFormEvaluationModule.withControlEvaluators(dynamicFormControlEvaluatorTypes),
  ],
  exports: [
    DynamicFormConfigModule,
    DynamicFormValidationModule,
  ],
})
export class DynamicFormControlModule {}

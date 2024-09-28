import { withDynamicFormFields } from '../dynamic-form-config/dynamic-form-config.module';
import { withDynamicFormControlEvaluators } from '../dynamic-form-evaluation/dynamic-form-evaluation.module';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { withDynamicFormControlValidators } from '../dynamic-form-validation/dynamic-form-validation.module';
import { DynamicFormsFeature } from '../dynamic-forms-feature';
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

export function withDynamicFormControlDefaultFeatures(): DynamicFormsFeature[] {
  return [
    withDynamicFormFields(dynamicFormControlType),
    withDynamicFormControlValidators(...dynamicFormControlValidatorTypes),
    withDynamicFormControlEvaluators(...dynamicFormControlEvaluatorTypes),
  ];
}

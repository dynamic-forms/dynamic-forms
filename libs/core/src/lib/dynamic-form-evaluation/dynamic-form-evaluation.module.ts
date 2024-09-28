import { Provider } from '@angular/core';
import { DynamicFormControlEvaluatorType } from '../dynamic-form-control/dynamic-form-control-evaluator-type';
import { DYNAMIC_FORM_CONTROL_EVALUATOR_TYPE_CONFIG } from '../dynamic-form-control/dynamic-form-control-evaluator-type-config';
import { DynamicFormsFeature } from '../dynamic-forms-feature';
import { DynamicFormEvaluationBuilder } from './dynamic-form-evaluation.builder';

export const dynamicFormEvaluationProviders: Provider[] = [DynamicFormEvaluationBuilder];

export function withDynamicFormControlEvaluators(...controlEvaluatorTypes: DynamicFormControlEvaluatorType[]): DynamicFormsFeature {
  const providers = controlEvaluatorTypes.map(controlEvaluatorType => {
    return {
      provide: DYNAMIC_FORM_CONTROL_EVALUATOR_TYPE_CONFIG,
      useValue: controlEvaluatorType,
      multi: true,
    };
  });
  return { providers };
}

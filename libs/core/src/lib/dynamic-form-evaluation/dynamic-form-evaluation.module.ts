import { ModuleWithProviders, NgModule } from '@angular/core';
import { DynamicFormControlEvaluatorType } from '../dynamic-form-control/dynamic-form-control-evaluator-type';
import { DYNAMIC_FORM_CONTROL_EVALUATOR_TYPE_CONFIG } from '../dynamic-form-control/dynamic-form-control-evaluator-type-config';
import { DynamicFormEvaluationBuilder } from './dynamic-form-evaluation.builder';

@NgModule({
  providers: [
    DynamicFormEvaluationBuilder
  ]
})
export class DynamicFormEvaluationModule {
  static withControlEvaluator(controlEvaluatorType: DynamicFormControlEvaluatorType): ModuleWithProviders<DynamicFormEvaluationModule> {
    return {
      ngModule: DynamicFormEvaluationModule,
      providers: [
        {
          provide: DYNAMIC_FORM_CONTROL_EVALUATOR_TYPE_CONFIG,
          useValue: controlEvaluatorType,
          multi: true
        }
      ]
    };
  }

  static withControlEvaluators(controlEvaluatorTypes: DynamicFormControlEvaluatorType[]): ModuleWithProviders<DynamicFormEvaluationModule> {
    return {
      ngModule: DynamicFormEvaluationModule,
      providers: [
        {
          provide: DYNAMIC_FORM_CONTROL_EVALUATOR_TYPE_CONFIG,
          useValue: controlEvaluatorTypes,
          multi: true
        }
      ]
    };
  }
}

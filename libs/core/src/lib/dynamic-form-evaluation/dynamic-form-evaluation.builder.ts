import { Injectable } from '@angular/core';
import { DynamicFormControl, DynamicFormControlEvaluator } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormControlDefinition } from '../dynamic-form-control/dynamic-form-control-definition';
import { DynamicFormControlEvaluators } from '../dynamic-form-control/dynamic-form-control-evaluators';
import { DynamicFormFieldEvaluatorFunction } from './dynamic-form-field-evaluator';

@Injectable()
export class DynamicFormEvaluationBuilder {
  static readonly controlEvaluations = {
    'select': { type: 'select', func: DynamicFormControlEvaluators.evalSelect }
  };

  getControlEvaluators(definition: DynamicFormControlDefinition): DynamicFormControlEvaluator[] {
    const evaluators = (definition.evaluations || []).map(evaluation => {
      const type = definition.template.input.type;
      const func = evaluation.func || this.getControlEvaluationFunction(evaluation.key, type);
      return func ? { key: evaluation.key, func } : null;
    });
    return evaluators.filter(evaluator => !!evaluator);
  }

  private getControlEvaluationFunction(key: string, inputType: string): DynamicFormFieldEvaluatorFunction<DynamicFormControl> {
    const evaluation = DynamicFormEvaluationBuilder.controlEvaluations[key];
    return evaluation && evaluation.type === inputType ? evaluation.func : null;
  }
}

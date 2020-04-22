import { Inject, Injectable, Optional } from '@angular/core';
import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormControlEvaluator } from '../dynamic-form-control/dynamic-form-control-evaluator';
import { DynamicFormControlEvaluatorType } from '../dynamic-form-control/dynamic-form-control-evaluator-type';
import { DynamicFormControlEvaluatorTypeConfig,
  DYNAMIC_FORM_CONTROL_EVALUATOR_TYPE_CONFIG } from '../dynamic-form-control/dynamic-form-control-evaluator-type-config';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';

@Injectable()
export class DynamicFormEvaluationBuilder {
  readonly controlEvaluatorTypes: DynamicFormControlEvaluatorType[];

  constructor(
    private libraryService: DynamicFormLibraryService,
    @Optional() @Inject(DYNAMIC_FORM_CONTROL_EVALUATOR_TYPE_CONFIG)
    private controlEvaluatorConfig: DynamicFormControlEvaluatorTypeConfig
  ) {
    this.controlEvaluatorTypes = this.libraryService.filterTypes(this.controlEvaluatorConfig);
  }

  getControlEvaluatorType(type: string): DynamicFormControlEvaluatorType {
    return this.controlEvaluatorTypes.find(f => f.type === type);
  }

  createControlEvaluators(control: DynamicFormControl): DynamicFormControlEvaluator[] {
    const evaluators = (control.definition.evaluations || []).map(evaluation => {
      const type = this.getControlEvaluatorType(control.definition.template.input.type);
      return type ? { key: evaluation.key, func: type.func } : null;
    });
    return evaluators.filter(evaluator => !!evaluator);
  }
}

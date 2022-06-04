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
    private controlEvaluatorConfig: DynamicFormControlEvaluatorTypeConfig,
  ) {
    this.controlEvaluatorTypes = this.libraryService.filterTypes(this.controlEvaluatorConfig);
  }

  getControlEvaluatorType(type: string): DynamicFormControlEvaluatorType {
    return this.controlEvaluatorTypes.find(f => f.type === type);
  }

  createControlEvaluators(control: DynamicFormControl): DynamicFormControlEvaluator[] {
    return Object.keys(control.definition.evaluators || {}).reduce((result, key) => {
      const evaluatorDefinition = control.definition.evaluators[key];
      const evaluatorType = this.getControlEvaluatorType(evaluatorDefinition.type);
      if (evaluatorType) {
        const type = evaluatorType.type;
        const inputType = evaluatorType.inputType;
        const func = evaluatorType.func;
        const evaluator = new DynamicFormControlEvaluator(key, type, inputType, control, func);
        return result.concat(evaluator);
      }
      return result;
    }, []);
  }
}

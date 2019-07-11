import { Injectable } from '@angular/core';
import { DynamicFormControlEvaluator } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormControlDefinition } from '../dynamic-form-control/dynamic-form-control-definition';

@Injectable()
export class DynamicFormEvaluationBuilder {
  getControlEvaluators(definition: DynamicFormControlDefinition): DynamicFormControlEvaluator[] {
    return [];
  }
}

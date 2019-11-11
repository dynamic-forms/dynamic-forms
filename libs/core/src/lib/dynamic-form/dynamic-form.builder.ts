import { Injectable } from '@angular/core';
import { DynamicFormArray } from '../dynamic-form-array/dynamic-form-array';
import { DynamicFormArrayDefinition } from '../dynamic-form-array/dynamic-form-array-definition';
import { DynamicFormControl, DynamicFormControlEvaluator } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormControlDefinition } from '../dynamic-form-control/dynamic-form-control-definition';
import { DynamicFormControlValidator } from '../dynamic-form-control/dynamic-form-control-validator';
import { DynamicFormElementDefinition } from '../dynamic-form-element/dynamic-form-element-definition';
import { DynamicFormEvaluationBuilder } from '../dynamic-form-evaluation/dynamic-form-evaluation.builder';
import { DynamicFormExpressionBuilder } from '../dynamic-form-expression/dynamic-form-expression.builder';
import { DynamicFormFieldExpressions } from '../dynamic-form-expression/dynamic-form-field-expressions';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldDefinition } from '../dynamic-form-field/dynamic-form-field-definition';
import { DynamicFormGroup } from '../dynamic-form-group/dynamic-form-group';
import { DynamicFormGroupDefinition } from '../dynamic-form-group/dynamic-form-group-definition';
import { DynamicFormValidationBuilder } from '../dynamic-form-validation/dynamic-form-validation.builder';
import { DynamicForm } from './dynamic-form';
import { DynamicFormDefinition } from './dynamic-form-definition';

@Injectable()
export class DynamicFormBuilder {
  constructor(
    private expressionBuilder: DynamicFormExpressionBuilder,
    private evaluationBuilder: DynamicFormEvaluationBuilder,
    private validationBuilder: DynamicFormValidationBuilder
  ) {}

  createForm(definition: DynamicFormDefinition, model: any) {
    const field = new DynamicForm(definition, model);
    field.setFieldExpressions(this.createFieldExpressions(field));
    field.setElements(this.createFormElements(field.definition.elements, field, field));
    return field;
  }

  createFormGroup(definition: DynamicFormGroupDefinition, root: DynamicFormField, parent: DynamicFormField, ) {
    const field = new DynamicFormGroup(definition, root, parent);
    field.setFieldExpressions(this.createFieldExpressions(field));
    field.setElements(this.createFormElements(definition.elements, root, field));
    return field;
  }

  createFormArray(definition: DynamicFormArrayDefinition, root: DynamicFormField, parent: DynamicFormField, ) {
    const field = new DynamicFormArray(definition, root, parent);
    field.setFields([]);
    return field;
  }

  createFormControl(definition: DynamicFormControlDefinition, root: DynamicFormField, parent: DynamicFormField) {
    const field = new DynamicFormControl(definition, root, parent);
    field.setFieldExpressions(this.createFieldExpressions(field));
    field.setEvaluators(this.createControlEvaluators(field.definition));
    field.setValidators(this.createControlValidators(field.definition));
    return field;
  }

  private createFormElements(definitions: DynamicFormElementDefinition[], root: DynamicFormField, parent: DynamicFormField) {
    return (definitions || []).map(definition => {
      switch (definition.type) {
        case 'group':
          return this.createFormGroup(<DynamicFormGroupDefinition>definition, root, parent);
        case 'array':
          return this.createFormArray(<DynamicFormArrayDefinition>definition, root, parent);
        case 'control':
          return this.createFormControl(<DynamicFormControlDefinition>definition, root, parent);
        default:
          throw Error(`Type ${ definition.type } is not defined`);
      }
    });
  }

  private createFieldExpressions(field: DynamicFormField): DynamicFormFieldExpressions {
    return this.expressionBuilder.createFieldExpressions(field);
  }

  private createControlEvaluators(definition: DynamicFormControlDefinition): DynamicFormControlEvaluator[] {
    return this.evaluationBuilder.createControlEvaluators(definition);
  }

  private createControlValidators(definition: DynamicFormControlDefinition): DynamicFormControlValidator[] {
    return this.validationBuilder.createControlValidators(definition.template);

  }
}

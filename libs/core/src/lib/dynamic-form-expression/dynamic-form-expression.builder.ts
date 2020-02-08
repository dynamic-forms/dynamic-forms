import { Injectable } from '@angular/core';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormField } from './../dynamic-form-field/dynamic-form-field';
import { dynamicFormActionExpressionArgs, DynamicFormActionExpression,
  DynamicFormActionExpressionFunction } from './dynamic-form-action-expression';
import { DynamicFormActionExpressions } from './dynamic-form-action-expressions';
import { dynamicFormFieldExpressionArgs, DynamicFormFieldExpression,
  DynamicFormFieldExpressionFunction } from './dynamic-form-field-expression';
import { DynamicFormFieldExpressions} from './dynamic-form-field-expressions';

@Injectable()
export class DynamicFormExpressionBuilder {
  createFieldExpressions(field: DynamicFormField): DynamicFormFieldExpressions {
    const expressions = field.definition.expressions;
    return expressions ? Object.keys(expressions).reduce((result, key) => {
      result[key] = this.createFieldExpression(key, field, expressions[key]);
      return result;
    }, {}) : null;
  }

  createActionExpressions(action: DynamicFormAction): DynamicFormActionExpressions {
    const expressions = action.definition.expressions;
    return expressions ? Object.keys(expressions).reduce((result, key) => {
      result[key] = this.createActionExpression(key, action, expressions[key]);
      return result;
    }, {}) : null;
  }

  private createFieldExpression(
    key: string, field: DynamicFormField, expression: string | DynamicFormFieldExpressionFunction
  ): DynamicFormFieldExpression {
    if (typeof expression === 'string') {
      const func = this.createFieldExpressionFunction(expression);
      return new DynamicFormFieldExpression(key, field, func);
    }
    return new DynamicFormFieldExpression(key, field, expression);
  }

  private createFieldExpressionFunction(expression: string): DynamicFormFieldExpressionFunction {
    return <DynamicFormFieldExpressionFunction>new Function(...dynamicFormFieldExpressionArgs, `return ${ expression };`);
  }

  private createActionExpression(
    key: string, action: DynamicFormAction, expression: string | DynamicFormActionExpressionFunction
  ): DynamicFormActionExpression {
    if (typeof expression === 'string') {
      const func = this.createActionExpressionFunction(expression);
      return new DynamicFormActionExpression(key, action, func);
    }
    return new DynamicFormActionExpression(key, action, expression);
  }

  private createActionExpressionFunction(expression: string): DynamicFormActionExpressionFunction {
    return <DynamicFormActionExpressionFunction>new Function(...dynamicFormActionExpressionArgs, `return ${ expression };`);
  }
}

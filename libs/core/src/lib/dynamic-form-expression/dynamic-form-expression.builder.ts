import { Injectable } from '@angular/core';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from './../dynamic-form-field/dynamic-form-field';
import { DynamicFormActionExpression, DynamicFormActionExpressionFunc } from './dynamic-form-action-expression';
import { DynamicFormActionExpressions } from './dynamic-form-action-expressions';
import { DynamicFormElementExpression, DynamicFormElementExpressionFunc } from './dynamic-form-element-expression';
import { DynamicFormElementExpressions } from './dynamic-form-element-expressions';
import { dynamicFormExpressionArgs } from './dynamic-form-expression';
import { DynamicFormFieldExpression, DynamicFormFieldExpressionFunc } from './dynamic-form-field-expression';
import { DynamicFormFieldExpressions } from './dynamic-form-field-expressions';

@Injectable()
export class DynamicFormExpressionBuilder {
  createElementExpressions(element: DynamicFormElement): DynamicFormElementExpressions {
    const expressions = element.definition.expressions;
    return expressions ? Object.keys(expressions).reduce((result, key) => {
      result[key] = this.createElementExpression(key, element, expressions[key]);
      return result;
    }, {}) : null;
  }

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

  private createElementExpression(
    key: string, element: DynamicFormElement, expression: string | DynamicFormElementExpressionFunc
  ): DynamicFormElementExpression {
    if (typeof expression === 'string') {
      const func = this.createExpressionFunction<DynamicFormElementExpressionFunc>(expression);
      return new DynamicFormElementExpression(key, element, func);
    }
    return new DynamicFormElementExpression(key, element, expression);
  }

  private createFieldExpression(
    key: string, field: DynamicFormField, expression: string | DynamicFormFieldExpressionFunc
  ): DynamicFormFieldExpression {
    if (typeof expression === 'string') {
      const func = this.createExpressionFunction<DynamicFormFieldExpressionFunc>(expression);
      return new DynamicFormFieldExpression(key, field, func);
    }
    return new DynamicFormFieldExpression(key, field, expression);
  }

  private createActionExpression(
    key: string, action: DynamicFormAction, expression: string | DynamicFormActionExpressionFunc
  ): DynamicFormActionExpression {
    if (typeof expression === 'string') {
      const func = this.createExpressionFunction<DynamicFormActionExpressionFunc>(expression);
      return new DynamicFormActionExpression(key, action, func);
    }
    return new DynamicFormActionExpression(key, action, expression);
  }

  private createExpressionFunction<Func extends Function>(expression: string): Func {
    return <Func>new Function(...dynamicFormExpressionArgs, `return ${ expression };`);
  }
}

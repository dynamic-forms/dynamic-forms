import { Injectable } from '@angular/core';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionExpression } from '../dynamic-form-action/dynamic-form-action-expression';
import { DynamicFormActionExpressionFunc } from '../dynamic-form-action/dynamic-form-action-expression-func';
import { DynamicFormActionExpressions } from '../dynamic-form-action/dynamic-form-action-expressions';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormElementExpression } from '../dynamic-form-element/dynamic-form-element-expression';
import { DynamicFormElementExpressionFunc } from '../dynamic-form-element/dynamic-form-element-expression-func';
import { DynamicFormElementExpressions } from '../dynamic-form-element/dynamic-form-element-expressions';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldExpression } from '../dynamic-form-field/dynamic-form-field-expression';
import { DynamicFormFieldExpressionFunc } from '../dynamic-form-field/dynamic-form-field-expression-func';
import { DynamicFormFieldExpressions } from '../dynamic-form-field/dynamic-form-field-expressions';
import { dynamicFormExpressionArgs } from './dynamic-form-expression';

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
    key: string, element: DynamicFormElement, expression: string | DynamicFormElementExpressionFunc,
  ): DynamicFormElementExpression {
    if (typeof expression === 'string') {
      const func = this.createExpressionFunction<DynamicFormElementExpressionFunc>(expression);
      return new DynamicFormElementExpression(key, element, func);
    }
    return new DynamicFormElementExpression(key, element, expression);
  }

  private createFieldExpression(
    key: string, field: DynamicFormField, expression: string | DynamicFormFieldExpressionFunc,
  ): DynamicFormFieldExpression {
    if (typeof expression === 'string') {
      const func = this.createExpressionFunction<DynamicFormFieldExpressionFunc>(expression);
      return new DynamicFormFieldExpression(key, field, func);
    }
    return new DynamicFormFieldExpression(key, field, expression);
  }

  private createActionExpression(
    key: string, action: DynamicFormAction, expression: string | DynamicFormActionExpressionFunc,
  ): DynamicFormActionExpression {
    if (typeof expression === 'string') {
      const func = this.createExpressionFunction<DynamicFormActionExpressionFunc>(expression);
      return new DynamicFormActionExpression(key, action, func);
    }
    return new DynamicFormActionExpression(key, action, expression);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private createExpressionFunction<Func extends Function>(expression: string): Func {
    return new Function(...dynamicFormExpressionArgs, `return ${ expression };`) as Func;
  }
}

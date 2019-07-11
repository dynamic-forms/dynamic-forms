import { Injectable } from '@angular/core';
import { DynamicFormField } from './../dynamic-form-field/dynamic-form-field';
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

  private createFieldExpression(key: string, field: DynamicFormField,
    expression: string | DynamicFormFieldExpressionFunction): DynamicFormFieldExpression {
    if (typeof expression === 'string') {
      const func = this.createFieldExpressionFunction(expression);
      return new DynamicFormFieldExpression(key, field, func);
    }
    return new DynamicFormFieldExpression(key, field, expression);
  }

  private createFieldExpressionFunction(expression: string): DynamicFormFieldExpressionFunction {
    return <DynamicFormFieldExpressionFunction>new Function(...dynamicFormFieldExpressionArgs, `return ${ expression };`);
  }
}

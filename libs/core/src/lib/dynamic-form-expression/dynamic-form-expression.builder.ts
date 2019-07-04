import { Injectable } from '@angular/core';
import { DynamicFormField } from './../dynamic-form-field/dynamic-form-field';
import { DynamicFormExpressionDependency } from './dynamic-form-expression';
import { dynamicFormFieldExpressionArgs, dynamicFormFieldExpressionDependencyArgs,
  DynamicFormFieldExpression, DynamicFormFieldFunction} from './dynamic-form-field-expression';
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
    expression: string | DynamicFormFieldFunction): DynamicFormFieldExpression {
    if (typeof expression === 'string') {
      const func = this.createFieldExpressionFunction(expression);
      const deps = this.createFieldExpressionDependencies(expression);
      return new DynamicFormFieldExpression(key, field, func, deps);
    }
    return new DynamicFormFieldExpression(key, field, expression, []);
  }

  private createFieldExpressionFunction(expression: string): DynamicFormFieldFunction {
    return <DynamicFormFieldFunction>new Function(...dynamicFormFieldExpressionArgs, `return ${ expression };`);
  }

  private createFieldExpressionDependencies(expression: string): DynamicFormExpressionDependency[] {
    return dynamicFormFieldExpressionDependencyArgs.reduce((result, expressionArgument) => {
      const dependencies = expression.match(expressionArgument.pattern);
      return dependencies ? result.concat(dependencies) : result;
    }, []);
  }
}

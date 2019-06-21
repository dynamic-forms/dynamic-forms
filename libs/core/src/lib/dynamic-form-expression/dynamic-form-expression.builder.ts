import { Injectable } from '@angular/core';
import { DynamicFormField } from './../dynamic-form-field/dynamic-form-field';
import { DynamicFormExpressionDependency, DynamicFormExpressionFunction } from './dynamic-form-expression';
import { dynamicFormFieldExpressionArgs, dynamicFormFieldExpressionDependencyArgs,
  DynamicFormFieldExpression } from './dynamic-form-field-expression';
import { DynamicFormFieldExpressions} from './dynamic-form-field-expressions';

@Injectable()
export class DynamicFormExpressionBuilder {
  createFieldExpressions(field: DynamicFormField): DynamicFormFieldExpressions {
    const expressions = field.definition.expressions;
    return expressions ? Object.keys(expressions).reduce((result, key) => {
      result[key] = this.createFieldExpression(key, expressions[key], field);
      return result;
    }, {}) : null;
  }

  private createFieldExpression(key: string, expression: string, field: DynamicFormField): DynamicFormFieldExpression {
    const func = this.createFieldExpressionFunction(expression);
    const deps = this.createFieldExpressionDependencies(expression);
    return new DynamicFormFieldExpression(key, field, func, deps);
  }

  private createFieldExpressionFunction(expression: string): DynamicFormExpressionFunction {
    return new Function(...dynamicFormFieldExpressionArgs, `return ${ expression };`);
  }

  private createFieldExpressionDependencies(expression: string): DynamicFormExpressionDependency[] {
    return dynamicFormFieldExpressionDependencyArgs.reduce((result, expressionArgument) => {
      const dependencies = expression.match(expressionArgument.pattern);
      return dependencies ? result.concat(dependencies) : result;
    }, []);
  }
}

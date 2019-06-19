import { Injectable } from '@angular/core';
import { DynamicFormField } from './../dynamic-form-field/dynamic-form-field';
import { DynamicFormExpressionDependency, DynamicFormExpressionFunction } from './dynamic-form-expression';
import { DynamicFormFieldExpression } from './dynamic-form-field-expression';
import { DynamicFormFieldExpressions} from './dynamic-form-field-expressions';

@Injectable()
export class DynamicFormExpressionBuilder {
  private readonly fieldExpressionArguments = [
    { name: 'model', pattern: /model+[.\w]+/g },
    { name: 'parentModel', pattern: /parentModel+[.\w]+/g },
    { name: 'rootModel', pattern: /rootModel+[.\w]+/g }
  ];
  private readonly fieldExpressionArgumentNames = this.fieldExpressionArguments.map(arg => arg.name);

  createFieldExpressions(field: DynamicFormField): DynamicFormFieldExpressions {
    const expressions = field.definition.expressions;
    return expressions ? Object.keys(expressions).reduce((result, key) => {
      result[key] = this.createFieldExpression(expressions[key], field);
      return result;
    }, {}) : null;
  }

  private createFieldExpression(expression: string, field: DynamicFormField): DynamicFormFieldExpression {
    const deps = this.createFieldExpressionDependencies(expression);
    const func = this.createFieldExpressionFunction(expression);
    return { field, deps, func, get value() {
      return func(field.model, field.parent.model, field.root.model); }
    };
  }

  private createFieldExpressionDependencies(expression: string): DynamicFormExpressionDependency[] {
    return this.fieldExpressionArguments.reduce((result, expressionArgument) => {
      const dependencies = expression.match(expressionArgument.pattern);
      return dependencies ? result.concat(dependencies) : result;
    }, []);
  }

  private createFieldExpressionFunction(expression: string): DynamicFormExpressionFunction {
    return new Function(...this.fieldExpressionArgumentNames, `return ${ expression };`);
  }
}

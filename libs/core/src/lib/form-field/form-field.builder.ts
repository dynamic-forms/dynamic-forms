import { FormField, FormFieldExpression, FormFieldExpressions, ExpressionDependency, ExpressionFunction } from './form-field.model';

export class FormFieldBuilder {
  private readonly expressionArguments = [
    { name: 'model', pattern: /model+[.\w]+/g },
    { name: 'parentModel', pattern: /parentModel+[.\w]+/g },
    { name: 'rootModel', pattern: /rootModel+[.\w]+/g }
  ];
  private readonly expressionArgumentNames = this.expressionArguments.map(arg => arg.name);

  createExpressions(field: FormField): FormFieldExpressions {
    const expressions = field.template.expressions;
    return expressions ? Object.keys(expressions).reduce((result, key) => {
      result[key] = this.createExpression(expressions[key], field);
      return result;
    }, {}) : null;
  }

  private createExpression(expression: string, field: FormField): FormFieldExpression {
    const deps = this.createExpressionDependencies(expression);
    const func = this.createExpressionFunction(expression);
    return { field, deps, func, get value() {
      return func(field.model, field.parent.model, field.root.model); }
    };
  }

  private createExpressionDependencies(expression: string): ExpressionDependency[] {
    return this.expressionArguments.reduce((result, expressionArgument) => {
      const dependencies = expression.match(expressionArgument.pattern);
      result.push(...dependencies);
      return result;
    }, []);
  }

  private createExpressionFunction(expression: string): ExpressionFunction {
    return new Function(...this.expressionArgumentNames, `return ${ expression };`);
  }
}

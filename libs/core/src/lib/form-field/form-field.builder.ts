import {
  FormFieldTemplate, FormFieldData, FormFieldExpressions,
  FormFieldExpression, ExpressionDependency, ExpressionFunction, FormField } from './form-field.model';

export class FormFieldBuilder {
  private readonly expressionArguments = [
    { name: 'model', pattern: /model+[.\w]+/g },
    { name: 'parentModel', pattern: /parentModel+[.\w]+/g },
    { name: 'rootModel', pattern: /rootModel+[.\w]+/g }
  ];
  private readonly expressionArgumentNames = this.expressionArguments.map(arg => arg.name);

  getPath(template: FormFieldTemplate, parent: FormField): string {
    return parent.path ? `${parent.path}.${template.key}` : template.key;
  }

  createModel(template: FormFieldTemplate, parent: FormField, model?: any): any {
    parent.data.model[template.key] = parent.data.model[template.key] || model || null;
    return parent.data.model[template.key];
  }

  createExpressions(template: FormFieldTemplate, data: FormFieldData): FormFieldExpressions {
    return template.expressions ? Object.keys(template.expressions).reduce((result, key) => {
      result[key] = this.createExpression(template.expressions[key], data);
      return result;
    }, {}) : null;
  }

  private createExpression(expression: string, data: FormFieldData): FormFieldExpression {
    const deps = this.createExpressionDependencies(expression);
    const func = this.createExpressionFunction(expression);
    return { data, deps, func, get value() { return func(data.model, data.parentModel, data.rootModel); } };
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

import { FormFieldTemplate, FormFieldData, FormFieldExpressions, FormFieldExpression } from './form-field.model';
import { FormExpressionsBuilder } from '../form-expressions';

export class FormFieldBuilder {
  constructor(protected expressionsBuilder: FormExpressionsBuilder) {}

  getPath(template: FormFieldTemplate, parentPath: string): string {
    return parentPath ? `${parentPath}.${template.key}` : template.key;
  }

  getModel(template: FormFieldTemplate, parentData: FormFieldData, model?: any): any {
    parentData.model[template.key] = parentData.model[template.key] || model || null;
    return parentData.model[template.key];
  }

  getExpressions(template: FormFieldTemplate, data: FormFieldData): FormFieldExpressions {
    return template.expressions ? Object.keys(template.expressions).reduce((result, key) => {
      result[key] = this.createExpression(template.expressions[key], data);
      return result;
    }, {}) : null;
  }

  private createExpression(expression: string, data: FormFieldData): FormFieldExpression {
    const deps = this.expressionsBuilder.createExpressionDependencies(expression);
    const func = this.expressionsBuilder.createExpressionFunction(expression);
    return { data, deps, func, get value() { /*console.log(data);*/ return func(data); } };
  }
}

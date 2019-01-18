import { FormFieldTemplate } from './form-field.model';

export class FormFieldBuilder {
  getPath(parentPath: string, template: FormFieldTemplate): string {
    return parentPath ? `${parentPath}.${template.key}` : template.key;
  }

  getModel(parentModel: any, template: FormFieldTemplate, model?: any): any {
    parentModel[template.key] = parentModel[template.key] || model || null;
    return parentModel[template.key];
  }
}

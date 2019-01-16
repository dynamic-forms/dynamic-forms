import { FormFieldTemplate } from './form-field.model';

export class FormFieldBuilder {
  getPath(parentPath: string, template: FormFieldTemplate): string {
    return parentPath ? `${parentPath}.${template.key}` : template.key;
  }

  getModel(parentModel: any, template: FormFieldTemplate): any {
    return parentModel ? parentModel[template.key] : null;
  }

  createModel(parentModel: any, template: FormFieldTemplate): any {
    parentModel[template.key] = parentModel[template.key] || {};
    return parentModel[template.key];
  }
}

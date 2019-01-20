import { FormFieldTemplate, FormFieldData } from './form-field.model';

export class FormFieldBuilder {
  getPath(template: FormFieldTemplate, parentPath: string): string {
    return parentPath ? `${parentPath}.${template.key}` : template.key;
  }

  getModel(template: FormFieldTemplate, parentData: FormFieldData, model?: any): any {
    parentData.model[template.key] = parentData.model[template.key] || model || null;
    return parentData.model[template.key];
  }
}

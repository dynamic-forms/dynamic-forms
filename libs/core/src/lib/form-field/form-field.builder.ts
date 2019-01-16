import { FormFieldTemplate } from '.';

export class FormFieldBuilder {
  getPath(template: FormFieldTemplate, parentPath: string): string {
    return parentPath ? `${parentPath}.${template.key}` : template.key;
  }

  getModel(template: FormFieldTemplate, parentModel: any): any {
    return parentModel ? parentModel[template.key] : null;
  }
}

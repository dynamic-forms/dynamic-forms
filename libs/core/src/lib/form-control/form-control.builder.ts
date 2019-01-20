import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormControlTemplate, FormControlField } from './form-control.model';
import { FormFieldBuilder } from '../form-field/form-field.builder';
import { FormValidationBuilder } from '../form-validation/form-validation.builder';
import { FormExpressionsBuilder } from '../form-expressions/form-expressions.builder';
import { FormFieldData } from '../form-field';

@Injectable()
export class FormControlBuilder extends FormFieldBuilder {
  constructor(
    private expressionsBuilder: FormExpressionsBuilder,
    private validationBuilder: FormValidationBuilder) {
    super();
  }

  createFormField(template: FormControlTemplate, parentData: FormFieldData, parentPath: string) {
    const path = this.getPath(template, parentPath);
    const data = this.getData(template, parentData);
    const validators = this.getValidators(template);
    const control = new FormControl(data.model, validators);
    const expressions = this.getExpressions(template);
    return new FormControlField(path, template, expressions, control, data);
  }

  private getData(template: FormControlTemplate, parentData: FormFieldData) {
    return {
      model: this.getModel(template, parentData, null),
      parentModel: parentData.model,
      rootModel: parentData.rootModel
    };
  }

  private getValidators(template: FormControlTemplate) {
    if (template.validation) {
      return Object.keys(template.validation)
        .map(key => this.getValidator(template, key))
        .filter(validator => !!validator);
    }
    return [];
  }

  private getValidator(template: FormControlTemplate, key: string) {
    const value = template.input[key];
    return this.validationBuilder.getValidator(template.validation, key, value);
  }

  private getExpressions(template: FormControlTemplate) {
    return this.expressionsBuilder.createExpressions(template.expressions);
  }
}

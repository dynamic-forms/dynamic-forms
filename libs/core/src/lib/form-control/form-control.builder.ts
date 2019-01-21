import { Injectable } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import { FormControlTemplate, FormControlField } from './form-control.model';
import { FormFieldBuilder } from '../form-field/form-field.builder';
import { FormValidationBuilder } from '../form-validation/form-validation.builder';
import { FormFieldData, FormFieldExpressions } from '../form-field';

@Injectable()
export class FormControlBuilder extends FormFieldBuilder {
  constructor(private validationBuilder: FormValidationBuilder) {
    super();
  }

  createFormField(_template: FormControlTemplate, parentData: FormFieldData, parentPath: string) {
    const path = this.getPath(_template, parentPath);
    const data = this.createData(_template, parentData);
    const expressions = this.createExpressions(_template, data);
    const template = this.createTemplate(_template, expressions);
    const validators = this.createValidators(template);
    const control = this.createControl(template, data, validators);
    return new FormControlField(path, data, template, expressions, control);
  }

  private createData(template: FormControlTemplate, parentData: FormFieldData) {
    return {
      model: this.createModel(template, parentData, null),
      parentModel: parentData.model,
      rootModel: parentData.rootModel
    };
  }

  private createTemplate(template: FormControlTemplate, expressions: FormFieldExpressions) {
    if (expressions) {
      Object.keys(expressions).forEach(key => {
        Object.defineProperty(template, key, { get: function() { return expressions[key].value; } });
      });
    }
    return template;
  }

  private createValidators(template: FormControlTemplate) {
    if (template.validation) {
      return Object.keys(template.validation)
        .map(key => this.createValidator(template, key))
        .filter(validator => !!validator);
    }
    return [];
  }

  private createValidator(template: FormControlTemplate, key: string) {
    const value = template.input[key];
    return this.validationBuilder.createValidator(template.validation, key, value);
  }

  private createControl(template: FormControlTemplate, data: FormFieldData, validators: ValidatorFn[]) {
    const control = new FormControl(data.model, validators);
    control.valueChanges.subscribe(value => {
      // console.log(data.model, value);
      data.parentModel[template.key] = value;
      data.model = value;
    });
    return control;
  }
}

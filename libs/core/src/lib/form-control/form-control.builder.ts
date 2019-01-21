import { Injectable } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import { FormControlTemplate, FormControlField } from './form-control.model';
import { FormFieldBuilder } from '../form-field/form-field.builder';
import { FormValidationBuilder } from '../form-validation/form-validation.builder';
import { FormFieldData, FormFieldExpressions, FormField } from '../form-field';

@Injectable()
export class FormControlBuilder extends FormFieldBuilder {
  constructor(private validationBuilder: FormValidationBuilder) {
    super();
  }

  createField(root: FormField, parent: FormField, template: FormControlTemplate) {
    const field = new FormControlField(root, parent, template);
    field.data = this.createData(field.template, parent);
    field.expressions = this.createExpressions(field.template, field.data);
    field.template = this.createTemplate(field.template, field.expressions);
    field.control = this.createControl(field.template, field.data, this.createValidators(field.template));
    return field;
  }

  private createData(template: FormControlTemplate, parent: FormField) {
    return {
      model: this.createModel(template, parent, null),
      parentModel: parent.data.model,
      rootModel: parent.data.rootModel
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

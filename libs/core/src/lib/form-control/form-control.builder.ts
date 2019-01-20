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
    private validationBuilder: FormValidationBuilder,
    protected expressionsBuilder: FormExpressionsBuilder) {
    super(expressionsBuilder);
  }

  createFormField(template: FormControlTemplate, parentData: FormFieldData, parentPath: string) {
    const path = this.getPath(template, parentPath);
    const data = this.getData(template, parentData);
    const validators = this.getValidators(template);
    const control = new FormControl(data.model, validators);
    const expressions = this.getExpressions(template, data);
    control.valueChanges.subscribe(value => {
      data.parentModel[template.key] = value;
      data.model = value;
    });
    return new FormControlField(path, data, template, expressions, control);
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
}

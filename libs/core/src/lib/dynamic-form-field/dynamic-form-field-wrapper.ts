import { DynamicFormElementWrapper } from '../dynamic-form-element/dynamic-form-element-wrapper';
import { DynamicFormValidationErrors } from '../dynamic-form-validation/dynamic-form-validation-errors';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormField } from './dynamic-form-field';
import { DynamicFormFieldDefinition } from './dynamic-form-field-definition';
import { DynamicFormFieldTemplate } from './dynamic-form-field-template';

export abstract class DynamicFormFieldWrapper<Field extends DynamicFormField = DynamicFormField>
  extends DynamicFormElementWrapper<DynamicFormFieldTemplate, DynamicFormFieldDefinition, Field> {

  constructor(protected validationService: DynamicFormValidationService) {
    super();
  }

  get field() { return this.element; }
  set field(field: Field) { this.element = field; }

  get id() { return this.field.path; }
  get control() { return this.field.control; }

  get errors(): DynamicFormValidationErrors {
    return this.control.errors;
  }

  get hasErrors() {
    return (this.errors || false) && true;
  }

  get showErrors() {
    return this.hasErrors && this.control.touched;
  }

  get errorMessage() {
    return this.validationService.getErrorMessage(this.errors);
  }
}

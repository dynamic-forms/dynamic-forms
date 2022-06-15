import { DynamicFormElementBase } from '../dynamic-form-element/dynamic-form-element-base';
import { DynamicFormValidationErrors } from '../dynamic-form-validation/dynamic-form-validation-errors';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormField } from './dynamic-form-field';
import { DynamicFormFieldControl } from './dynamic-form-field-control';
import { DynamicFormFieldDefinition } from './dynamic-form-field-definition';
import { DynamicFormFieldTemplate } from './dynamic-form-field-template';

export abstract class DynamicFormFieldBase<
  Value = any, Model extends Value = Value,
  Control extends DynamicFormFieldControl<Value> = DynamicFormFieldControl<Value>,
  Template extends DynamicFormFieldTemplate = DynamicFormFieldTemplate,
  Definition extends DynamicFormFieldDefinition<Template> = DynamicFormFieldDefinition<Template>,
  Field extends DynamicFormField<Value, Model, Control, Template, Definition> =
    DynamicFormField<Value, Model, Control, Template, Definition>
> extends DynamicFormElementBase<Template, Definition, Field> {

  constructor(protected validationService: DynamicFormValidationService) {
    super();
  }

  get key(): string { return this.element.key; }
  get index(): number { return this.element.index; }
  get path(): string { return this.element.path; }

  get field(): Field { return this.element; }
  set field(field: Field) { this.element = field; }

  get hidden(): boolean { return this.field.hidden; }
  get readonly(): boolean { return this.field.readonly; }

  get control(): Control { return this.field.control; }

  get errors(): DynamicFormValidationErrors { return this.field.errors; }
  get hasErrors(): boolean { return this.field.hasErrors; }
  get showErrors(): boolean { return this.field.showErrors; }

  get errorMessage(): string {
    return this.validationService.getErrorMessage(this.errors);
  }
}

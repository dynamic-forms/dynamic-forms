import { DynamicFormFieldBase } from '../dynamic-form-field/dynamic-form-field-base';
import { FormControlBase } from '../dynamic-form-field/dynamic-form-field-control';
import { DynamicFormInput } from '../dynamic-form-input/dynamic-form-input';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormControl } from './dynamic-form-control';
import { DynamicFormControlDefinition } from './dynamic-form-control-definition';
import { DynamicFormControlHints } from './dynamic-form-control-hints';
import { DynamicFormControlTemplate } from './dynamic-form-control-template';

export abstract class DynamicFormControlBase<
  Value = any,
  Input extends DynamicFormInput<Value> = DynamicFormInput<Value>,
  Template extends DynamicFormControlTemplate<Value, Input> = DynamicFormControlTemplate<Value, Input>,
  Definition extends DynamicFormControlDefinition<Value, Input, Template> = DynamicFormControlDefinition<Value, Input, Template>,
  Control extends DynamicFormControl<Value, Input, Template, Definition> = DynamicFormControl<Value, Input, Template, Definition>
> extends DynamicFormFieldBase<Value, Value, FormControlBase<Value>, Template, Definition, Control> {

  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }

  get input(): Input { return this.field.input; }
  get inputId(): string { return this.field.inputId; }
  get inputType(): string { return this.field.inputType; }

  get hints(): DynamicFormControlHints { return this.template.hints; }
}

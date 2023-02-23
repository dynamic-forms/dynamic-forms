import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormControlDefinition } from '../dynamic-form-control/dynamic-form-control-definition';
import { DynamicFormControlHints } from '../dynamic-form-control/dynamic-form-control-hints';
import { DynamicFormControlTemplate } from '../dynamic-form-control/dynamic-form-control-template';
import { DynamicFormControlValidation } from '../dynamic-form-control/dynamic-form-control-validation';
import { DynamicFormFieldBase } from '../dynamic-form-field/dynamic-form-field-base';
import { FormControlBase } from '../dynamic-form-field/dynamic-form-field-control';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormInput, DynamicFormInputValue } from './dynamic-form-input';

export abstract class DynamicFormInputBaseImpl<
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
  get validation(): DynamicFormControlValidation { return this.template.validation; }
}

export abstract class DynamicFormInputBase<
  Input extends DynamicFormInput = DynamicFormInput,
  Template extends DynamicFormControlTemplate<DynamicFormInputValue<Input>, Input> =
    DynamicFormControlTemplate<DynamicFormInputValue<Input>, Input>,
  Definition extends DynamicFormControlDefinition<DynamicFormInputValue<Input>, Input, Template> =
    DynamicFormControlDefinition<DynamicFormInputValue<Input>, Input, Template>,
  Control extends DynamicFormControl<DynamicFormInputValue<Input>, Input, Template, Definition> =
    DynamicFormControl<DynamicFormInputValue<Input>, Input, Template, Definition>
> extends DynamicFormInputBaseImpl<DynamicFormInputValue<Input>, Input, Template, Definition, Control> {

  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}

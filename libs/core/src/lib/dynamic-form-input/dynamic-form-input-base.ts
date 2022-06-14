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
  TValue = any,
  Input extends DynamicFormInput<TValue> = DynamicFormInput<TValue>,
  Template extends DynamicFormControlTemplate<TValue, Input> = DynamicFormControlTemplate<TValue, Input>,
  Definition extends DynamicFormControlDefinition<TValue, Input, Template> = DynamicFormControlDefinition<TValue, Input, Template>,
  Control extends DynamicFormControl<TValue, Input, Template, Definition> = DynamicFormControl<TValue, Input, Template, Definition>
> extends DynamicFormFieldBase<TValue, TValue, FormControlBase<TValue>, Template, Definition, Control> {

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
  Input extends DynamicFormInput = DynamicFormInput
> extends DynamicFormInputBaseImpl<DynamicFormInputValue<Input>, Input> {

  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}

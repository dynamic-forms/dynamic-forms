import { FormControl } from '@angular/forms';
import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormControlDefinition } from '../dynamic-form-control/dynamic-form-control-definition';
import { DynamicFormControlHints } from '../dynamic-form-control/dynamic-form-control-hints';
import { DynamicFormControlTemplate } from '../dynamic-form-control/dynamic-form-control-template';
import { DynamicFormControlValidation } from '../dynamic-form-control/dynamic-form-control-validation';
import { DynamicFormFieldBase } from '../dynamic-form-field/dynamic-form-field-base';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormInput } from './dynamic-form-input';

export abstract class DynamicFormInputBase<
  Input extends DynamicFormInput = DynamicFormInput,
  Template extends DynamicFormControlTemplate<Input> = DynamicFormControlTemplate<Input>,
  Definition extends DynamicFormControlDefinition<Input, Template> = DynamicFormControlDefinition<Input, Template>,
  Control extends DynamicFormControl<Input, Template, Definition> = DynamicFormControl<Input, Template, Definition>
> extends DynamicFormFieldBase<FormControl, Template, Definition, Control> {

  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }

  get template(): Template { return this.field.template; }

  get input(): Input { return this.field.input; }
  get inputId(): string { return this.field.inputId; }

  get hints(): DynamicFormControlHints { return this.template.hints; }
  get validation(): DynamicFormControlValidation { return this.template.validation; }
}

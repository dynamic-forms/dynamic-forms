import { FormControl } from '@angular/forms';
import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormControlDefinition } from '../dynamic-form-control/dynamic-form-control-definition';
import { DynamicFormControlHints } from '../dynamic-form-control/dynamic-form-control-hints';
import { DynamicFormControlTemplate } from '../dynamic-form-control/dynamic-form-control-template';
import { DynamicFormControlValidation } from '../dynamic-form-control/dynamic-form-control-validation';
import { DynamicFormFieldBase } from '../dynamic-form-field/dynamic-form-field-base';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormInput } from './dynamic-form-input';

export abstract class DynamicFormInputBase<Input extends DynamicFormInput = DynamicFormInput>
  extends DynamicFormFieldBase<FormControl, DynamicFormControlTemplate<Input>,
    DynamicFormControlDefinition<Input>, DynamicFormControl<Input>> {

  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }

  get template(): DynamicFormControlTemplate<Input> { return this.field.template; }

  get input(): Input { return this.field.input; }
  get inputId(): string { return this.field.inputId; }

  get hints(): DynamicFormControlHints { return this.template.hints; }
  get validation(): DynamicFormControlValidation { return this.template.validation; }
}

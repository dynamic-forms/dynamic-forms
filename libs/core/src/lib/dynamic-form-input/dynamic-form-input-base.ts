import { FormControl } from '@angular/forms';
import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormControlDefinition } from '../dynamic-form-control/dynamic-form-control-definition';
import { DynamicFormControlTemplate } from '../dynamic-form-control/dynamic-form-control-template';
import { DynamicFormFieldBase } from '../dynamic-form-field/dynamic-form-field-base';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormInput } from './dynamic-form-input';

export abstract class DynamicFormInputBase<FormInput extends DynamicFormInput = DynamicFormInput>
  extends DynamicFormFieldBase<FormControl, DynamicFormControlTemplate<FormInput>,
    DynamicFormControlDefinition<FormInput>, DynamicFormControl<FormInput>> {

  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }

  get template() { return this.field.template; }

  get input() { return this.template.input; }
  get hints() { return this.template.hints; }
  get validation() { return this.template.validation; }
}

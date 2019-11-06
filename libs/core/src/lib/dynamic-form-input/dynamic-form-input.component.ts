import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormControlDefinition } from '../dynamic-form-control/dynamic-form-control-definition';
import { DynamicFormControlTemplate } from '../dynamic-form-control/dynamic-form-control-template';
import { DynamicFormFieldControl } from '../dynamic-form-field/dynamic-form-field-control';
import { DynamicFormFieldWrapper } from '../dynamic-form-field/dynamic-form-field-wrapper';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormInput } from './dynamic-form-input';

export abstract class DynamicFormInputComponent<
  FormInput extends DynamicFormInput = DynamicFormInput
> extends DynamicFormFieldWrapper<
  DynamicFormFieldControl,
  DynamicFormControlTemplate<FormInput>,
  DynamicFormControlDefinition<FormInput>,
  DynamicFormControl<FormInput>
> {

  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }

  get input() { return this.field.template.input; }
  get hints() { return this.field.template.hints; }
  get validation() { return this.field.template.validation; }
}

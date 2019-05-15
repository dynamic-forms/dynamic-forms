import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormFieldBase } from '../dynamic-form-field/dynamic-form-field-base';
import { DynamicFormInput } from './dynamic-form-input';

export abstract class DynamicFormInputComponent<FormInput extends DynamicFormInput = DynamicFormInput>
  extends DynamicFormFieldBase<DynamicFormControl<FormInput>> {
  get input() { return this.field.template.input; }
  get validation() { return this.field.template.validation; }
}

import { DynamicFormComponentType } from '../dynamic-form-config/dynamic-form-component-type';
import { DynamicFormInputBase } from '../dynamic-form-input/dynamic-form-input-base';
import { DynamicFormInput, DynamicFormInputControl, DynamicFormInputControlConstructor } from './dynamic-form-input';

export interface DynamicFormInputType<
  FormInput extends DynamicFormInput = DynamicFormInput,
  InputControl extends DynamicFormInputControl<FormInput> = DynamicFormInputControl<FormInput>,
  InputBase extends DynamicFormInputBase<FormInput> = DynamicFormInputBase<FormInput>,
> extends DynamicFormComponentType<InputBase> {
  control?: DynamicFormInputControlConstructor<FormInput, InputControl>;
  wrappers?: string[];
}

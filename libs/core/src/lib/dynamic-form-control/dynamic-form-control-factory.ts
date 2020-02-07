import { FormControl } from '@angular/forms';
import { DynamicFormFieldFactory } from '../dynamic-form-field/dynamic-form-field-factory';
import { DynamicFormInput } from '../dynamic-form-input/dynamic-form-input';
import { DynamicFormControl } from './dynamic-form-control';
import { DynamicFormControlDefinition } from './dynamic-form-control-definition';
import { DynamicFormControlTemplate } from './dynamic-form-control-template';

export type DynamicFormControlFactory<
  Input extends DynamicFormInput = DynamicFormInput,
  Template extends DynamicFormControlTemplate<Input> = DynamicFormControlTemplate<Input>,
  Definition extends DynamicFormControlDefinition<Input, Template> = DynamicFormControlDefinition<Input, Template>,
  Control extends DynamicFormControl<Input, Template, Definition> = DynamicFormControl<Input, Template, Definition>
> = DynamicFormFieldFactory<FormControl, Template, Definition, Control>;

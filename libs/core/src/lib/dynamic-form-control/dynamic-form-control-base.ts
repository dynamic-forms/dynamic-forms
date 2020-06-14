import { FormControl } from '@angular/forms';
import { DynamicFormFieldBase } from '../dynamic-form-field/dynamic-form-field-base';
import { DynamicFormInput } from '../dynamic-form-input/dynamic-form-input';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormControl } from './dynamic-form-control';
import { DynamicFormControlDefinition } from './dynamic-form-control-definition';
import { DynamicFormControlTemplate } from './dynamic-form-control-template';

export abstract class DynamicFormControlBase<
  Input extends DynamicFormInput = DynamicFormInput,
  Template extends DynamicFormControlTemplate<Input> = DynamicFormControlTemplate<Input>,
  Definition extends DynamicFormControlDefinition<Input, Template> = DynamicFormControlDefinition<Input, Template>,
  Control extends DynamicFormControl<Input, Template, Definition> = DynamicFormControl<Input, Template, Definition>
> extends DynamicFormFieldBase<FormControl, Template, Definition, Control> {

  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}

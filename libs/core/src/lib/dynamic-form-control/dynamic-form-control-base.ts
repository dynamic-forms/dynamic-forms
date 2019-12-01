import { FormControl } from '@angular/forms';
import { DynamicFormFieldBase } from '../dynamic-form-field/dynamic-form-field-base';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormControl } from './dynamic-form-control';
import { DynamicFormControlDefinition } from './dynamic-form-control-definition';
import { DynamicFormControlTemplate } from './dynamic-form-control-template';

export abstract class DynamicFormControlBase extends DynamicFormFieldBase<
  FormControl, DynamicFormControlTemplate, DynamicFormControlDefinition, DynamicFormControl
> {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}

import { FormGroup } from '@angular/forms';
import { DynamicFormFieldBase } from '../dynamic-form-field/dynamic-form-field-base';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormGroup } from './dynamic-form-group';
import { DynamicFormGroupDefinition } from './dynamic-form-group-definition';
import { DynamicFormGroupTemplate } from './dynamic-form-group-template';

export abstract class DynamicFormGroupBase extends DynamicFormFieldBase<
  FormGroup, DynamicFormGroupTemplate, DynamicFormGroupDefinition, DynamicFormGroup
> {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}

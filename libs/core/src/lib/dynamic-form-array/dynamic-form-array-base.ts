import { FormArray } from '@angular/forms';
import { DynamicFormFieldBase } from '../dynamic-form-field/dynamic-form-field-base';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormArray } from './dynamic-form-array';
import { DynamicFormArrayDefinition } from './dynamic-form-array-definition';
import { DynamicFormArrayTemplate } from './dynamic-form-array-template';

export abstract class DynamicFormArrayBase extends DynamicFormFieldBase<
  FormArray, DynamicFormArrayTemplate, DynamicFormArrayDefinition, DynamicFormArray
> {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}

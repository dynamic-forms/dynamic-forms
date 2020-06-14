import { FormArray } from '@angular/forms';
import { DynamicFormFieldBase } from '../dynamic-form-field/dynamic-form-field-base';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormArray } from './dynamic-form-array';
import { DynamicFormArrayDefinition } from './dynamic-form-array-definition';
import { DynamicFormArrayTemplate } from './dynamic-form-array-template';

export abstract class DynamicFormArrayBase<
  Template extends DynamicFormArrayTemplate = DynamicFormArrayTemplate,
  Definition extends DynamicFormArrayDefinition<Template> = DynamicFormArrayDefinition<Template>,
  Array extends DynamicFormArray<Template, Definition> = DynamicFormArray<Template, Definition>
> extends DynamicFormFieldBase<FormArray, Template, Definition, Array> {

  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}

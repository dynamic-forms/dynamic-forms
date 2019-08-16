import { Component } from '@angular/core';
import { DynamicFormFieldWrapper } from '../dynamic-form-field/dynamic-form-field-wrapper';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormGroup } from './dynamic-form-group';

@Component({
  selector: 'dynamic-form-group',
  templateUrl: './dynamic-form-group.component.html'
})
export class DynamicFormGroupComponent extends DynamicFormFieldWrapper<DynamicFormGroup> {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }

  get fields() { return this.field.fields; }
}

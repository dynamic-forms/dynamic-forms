import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormFieldWrapper } from '../dynamic-form-field/dynamic-form-field-wrapper';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormGroup } from './dynamic-form-group';
import { DynamicFormGroupDefinition } from './dynamic-form-group-definition';
import { DynamicFormGroupTemplate } from './dynamic-form-group-template';

@Component({
  selector: 'dynamic-form-group',
  templateUrl: './dynamic-form-group.component.html'
})
export class DynamicFormGroupComponent extends DynamicFormFieldWrapper<FormGroup,
  DynamicFormGroupTemplate, DynamicFormGroupDefinition, DynamicFormGroup> {

  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }

  get fields() { return this.field.fields; }
}

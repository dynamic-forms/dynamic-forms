import { Component } from '@angular/core';
import { FormArray } from '@angular/forms';
import { DynamicFormFieldWrapper } from '../dynamic-form-field/dynamic-form-field-wrapper';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormArray } from './dynamic-form-array';
import { DynamicFormArrayDefinition } from './dynamic-form-array-definition';
import { DynamicFormArrayTemplate } from './dynamic-form-array-template';

@Component({
  selector: 'dynamic-form-array',
  templateUrl: './dynamic-form-array.component.html'
})
export class DynamicFormArrayComponent extends DynamicFormFieldWrapper<FormArray,
  DynamicFormArrayTemplate, DynamicFormArrayDefinition, DynamicFormArray> {

  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }

  get fields() { return this.field.fields; }
}

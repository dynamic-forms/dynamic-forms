import { Component } from '@angular/core';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormArrayBase } from './dynamic-form-array-base';

@Component({
  selector: 'dynamic-form-array',
  templateUrl: './dynamic-form-array.component.html'
})
export class DynamicFormArrayComponent extends DynamicFormArrayBase {

  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }

  get fields() { return this.field.fields; }
}

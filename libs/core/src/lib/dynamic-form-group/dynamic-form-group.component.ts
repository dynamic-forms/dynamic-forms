import { Component } from '@angular/core';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormGroupBase } from './dynamic-form-group-base';

@Component({
  selector: 'dynamic-form-group',
  templateUrl: './dynamic-form-group.component.html'
})
export class DynamicFormGroupComponent extends DynamicFormGroupBase {

  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }

  get elements() { return this.field.elements; }
}

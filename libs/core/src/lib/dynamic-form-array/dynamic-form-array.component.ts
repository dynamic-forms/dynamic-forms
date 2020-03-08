import { Component } from '@angular/core';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
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

  get elements(): DynamicFormElement[] { return this.field.elements; }
  get actions(): DynamicFormAction[] { return this.field.actions; }
}

import { Component } from '@angular/core';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
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

  get elements(): DynamicFormElement[] { return this.field.elements; }
  get actions(): DynamicFormAction[] { return this.field.actions; }
}

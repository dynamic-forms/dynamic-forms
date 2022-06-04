import { Component } from '@angular/core';
import { DynamicFormActionService, DynamicFormButtonBase } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-button',
  templateUrl: './dynamic-form-button.component.html',
})
export class BsDynamicFormButtonComponent extends DynamicFormButtonBase {
  constructor(protected override actionService: DynamicFormActionService) {
    super(actionService);
  }
}

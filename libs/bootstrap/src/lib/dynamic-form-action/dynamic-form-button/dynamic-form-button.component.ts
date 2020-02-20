import { Component } from '@angular/core';
import { DynamicFormActionService, DynamicFormButtonComponent } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-button',
  templateUrl: './dynamic-form-button.component.html'
})
export class BsDynamicFormButtonComponent extends DynamicFormButtonComponent {
  constructor(protected actionService: DynamicFormActionService) {
    super(actionService);
  }
}

import { Component } from '@angular/core';
import { DynamicFormActionService, DynamicFormIconComponent } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-icon',
  templateUrl: './dynamic-form-icon.component.html'
})
export class BsDynamicFormIconComponent extends DynamicFormIconComponent {
  constructor(protected actionService: DynamicFormActionService) {
    super(actionService);
  }
}

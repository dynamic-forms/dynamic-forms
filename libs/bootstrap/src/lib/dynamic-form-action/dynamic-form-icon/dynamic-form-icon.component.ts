import { Component } from '@angular/core';
import { DynamicFormActionService, DynamicFormIconBase } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-icon',
  templateUrl: './dynamic-form-icon.component.html'
})
export class BsDynamicFormIconComponent extends DynamicFormIconBase {
  constructor(protected actionService: DynamicFormActionService) {
    super(actionService);
  }
}

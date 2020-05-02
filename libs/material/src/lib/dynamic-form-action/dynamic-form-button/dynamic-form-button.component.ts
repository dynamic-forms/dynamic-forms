import { Component } from '@angular/core';
import { DynamicFormActionService, DynamicFormButtonBase } from '@dynamic-forms/core';

@Component({
  selector: 'mat-dynamic-form-button',
  templateUrl: './dynamic-form-button.component.html'
})
export class MatDynamicFormButtonComponent extends DynamicFormButtonBase {
  constructor(protected actionService: DynamicFormActionService) {
    super(actionService);
  }
}

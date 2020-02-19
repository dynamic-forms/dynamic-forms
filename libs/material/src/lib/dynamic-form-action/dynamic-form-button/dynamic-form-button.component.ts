import { Component } from '@angular/core';
import { DynamicFormActionHandler, DynamicFormButtonComponent } from '@dynamic-forms/core';

@Component({
  selector: 'mat-dynamic-form-button',
  templateUrl: './dynamic-form-button.component.html'
})
export class MatDynamicFormButtonComponent extends DynamicFormButtonComponent {
  constructor(protected actionHandler: DynamicFormActionHandler) {
    super(actionHandler);
  }
}

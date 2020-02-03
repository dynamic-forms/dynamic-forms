import { Component } from '@angular/core';
import { DynamicFormButtonComponent } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-button',
  templateUrl: './dynamic-form-button.component.html'
})
export class BsDynamicFormButtonComponent extends DynamicFormButtonComponent {
  constructor() {
    super();
  }
}

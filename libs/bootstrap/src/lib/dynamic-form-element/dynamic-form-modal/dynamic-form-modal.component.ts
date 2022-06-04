import { Component } from '@angular/core';
import { DynamicFormModalBase } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-modal',
  templateUrl: './dynamic-form-modal.component.html',
})
export class BsDynamicFormModalComponent extends DynamicFormModalBase {
  constructor() {
    super();
  }
}

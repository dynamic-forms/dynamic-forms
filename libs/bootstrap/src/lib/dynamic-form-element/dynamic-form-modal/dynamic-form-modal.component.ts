import { Component } from '@angular/core';
import { DynamicFormElementComponent, DynamicFormModalBase } from '@dynamic-forms/core';
import { BsDynamicFormDialogComponent } from '../../dynamic-form-dialog/dynamic-form-dialog.component';

@Component({
  selector: 'bs-dynamic-form-modal',
  templateUrl: './dynamic-form-modal.component.html',
  imports: [DynamicFormElementComponent, BsDynamicFormDialogComponent],
})
export class BsDynamicFormModalComponent extends DynamicFormModalBase {
  constructor() {
    super();
  }
}

import { Component } from '@angular/core';
import { DynamicFormActionService, DynamicFormDialogBase } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-dialog',
  templateUrl: './dynamic-form-dialog.component.html'
})
export class BsDynamicFormDialogComponent extends DynamicFormDialogBase {
  constructor(protected actionService: DynamicFormActionService) {
    super(actionService);
  }
}

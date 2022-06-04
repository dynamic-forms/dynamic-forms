import { Component } from '@angular/core';
import { DynamicFormActionService, DynamicFormIconBase } from '@dynamic-forms/core';

@Component({
  selector: 'mat-dynamic-form-icon',
  templateUrl: './dynamic-form-icon.component.html',
})
export class MatDynamicFormIconComponent extends DynamicFormIconBase {
  constructor(protected override actionService: DynamicFormActionService) {
    super(actionService);
  }
}

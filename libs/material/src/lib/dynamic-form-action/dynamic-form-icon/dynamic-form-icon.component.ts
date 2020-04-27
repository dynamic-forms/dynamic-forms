import { Component } from '@angular/core';
import { DynamicFormActionService, DynamicFormIconComponent } from '@dynamic-forms/core';

@Component({
  selector: 'mat-dynamic-form-icon',
  templateUrl: './dynamic-form-icon.component.html'
})
export class MatDynamicFormIconComponent extends DynamicFormIconComponent {
  constructor(protected actionService: DynamicFormActionService) {
    super(actionService);
  }
}

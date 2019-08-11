import { Component } from '@angular/core';
import { DynamicFormControlComponent } from '@dynamic-forms/core';
import { DynamicFormComponentFactory } from '@dynamic-forms/core';

@Component({
  selector: 'mat-dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html'
})
export class MatDynamicFormControlComponent extends DynamicFormControlComponent {
  constructor(componentFactory: DynamicFormComponentFactory) {
    super(componentFactory);
  }
}

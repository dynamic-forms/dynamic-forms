import { Component } from '@angular/core';
import { DynamicFormControlComponent } from '@dynamic-forms/core';
import { DynamicFormComponentFactory } from '@dynamic-forms/core';
import { DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html'
})
export class BsDynamicFormControlComponent extends DynamicFormControlComponent {
  constructor(
    protected componentFactory: DynamicFormComponentFactory,
    protected validationService: DynamicFormValidationService
  ) {
    super(componentFactory, validationService);
  }
}

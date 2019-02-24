import { Component } from '@angular/core';
import { DynamicFormBuilder, DynamicFormComponent } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form',
  templateUrl: './dynamic-form.component.html'
})
export class BsDynamicFormComponent extends DynamicFormComponent {
  constructor(formBuilder: DynamicFormBuilder) {
    super(formBuilder);
  }
}

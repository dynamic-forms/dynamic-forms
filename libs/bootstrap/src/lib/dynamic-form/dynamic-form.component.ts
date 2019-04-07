import { Component } from '@angular/core';
import { DynamicFormBuilder, DynamicFormComponent } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form',
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormBootstrapComponent extends DynamicFormComponent {
  constructor(formBuilder: DynamicFormBuilder) {
    super(formBuilder);
  }
}

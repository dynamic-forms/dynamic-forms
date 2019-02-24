import { Component } from '@angular/core';
import { DynamicFormBuilder, DynamicFormComponent } from '@dynamic-forms/core';

@Component({
  selector: 'mat-dynamic-form',
  templateUrl: './dynamic-form.component.html'
})
export class MatDynamicFormComponent extends DynamicFormComponent {
  constructor(formBuilder: DynamicFormBuilder) {
    super(formBuilder);
  }
}

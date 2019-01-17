import { Component, Input } from '@angular/core';
import { FormArrayField } from './form-array.model';

@Component({
  selector: 'dynamic-form-array',
  templateUrl: './form-array.component.html'
})
export class FormArrayComponent {
  @Input() formField: FormArrayField;
}

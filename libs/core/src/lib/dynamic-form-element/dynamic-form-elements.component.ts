import { Component, Input } from '@angular/core';
import { DynamicFormElement } from './dynamic-form-element';

@Component({
  selector: 'dynamic-form-elements',
  templateUrl: './dynamic-form-elements.component.html',
})
export class DynamicFormElementsComponent {
  @Input() elements: DynamicFormElement[];
}

import { Component, Input } from '@angular/core';
import { DynamicFormElement } from './dynamic-form-element';
import { DynamicFormElementComponent } from './dynamic-form-element.component';

@Component({
  selector: 'dynamic-form-elements',
  imports: [DynamicFormElementComponent],
  templateUrl: './dynamic-form-elements.component.html',
})
export class DynamicFormElementsComponent {
  @Input() elements: DynamicFormElement[];
}

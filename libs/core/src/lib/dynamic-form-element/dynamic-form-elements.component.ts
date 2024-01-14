import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DynamicFormElement } from './dynamic-form-element';
import { DynamicFormElementComponent } from './dynamic-form-element.component';

@Component({
  standalone: true,
  selector: 'dynamic-form-elements',
  templateUrl: './dynamic-form-elements.component.html',
  imports: [NgFor, DynamicFormElementComponent],
})
export class DynamicFormElementsComponent {
  @Input() elements: DynamicFormElement[];
}

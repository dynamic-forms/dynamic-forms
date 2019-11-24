import { Component } from '@angular/core';
import { DynamicFormElementWrapper } from '../dynamic-form-element-wrapper';
import { DynamicFormContainerTemplate } from './dynamic-form-container-template';

@Component({
  selector: 'dynamic-form-container',
  templateUrl: './dynamic-form-container.component.html'
})
export class DynamicFormContainerComponent extends DynamicFormElementWrapper<DynamicFormContainerTemplate> {
  constructor() {
    super();
  }

  get elements() { return this.element.elements; }
}

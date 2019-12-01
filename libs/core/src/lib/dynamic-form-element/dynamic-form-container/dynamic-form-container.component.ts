import { Component } from '@angular/core';
import { DynamicFormElementBase } from '../dynamic-form-element-base';
import { DynamicFormContainerTemplate } from './dynamic-form-container-template';

@Component({
  selector: 'dynamic-form-container',
  templateUrl: './dynamic-form-container.component.html'
})
export class DynamicFormContainerComponent extends DynamicFormElementBase<DynamicFormContainerTemplate> {
  constructor() {
    super();
  }

  get elements() { return this.element.elements; }
}

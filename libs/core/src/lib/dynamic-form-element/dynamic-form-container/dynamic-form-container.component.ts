import { Component } from '@angular/core';
import { DynamicFormElement } from '../dynamic-form-element';
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

  get elements(): DynamicFormElement[] { return this.element.elements; }
}

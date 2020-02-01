import { Component } from '@angular/core';
import { DynamicFormElementBase } from '../dynamic-form-element-base';
import { DynamicFormButtonTemplate } from './dynamic-form-button-template';

@Component({
  selector: 'dynamic-form-button',
  templateUrl: './dynamic-form-button.component.html'
})
export class DynamicFormButtonComponent extends DynamicFormElementBase<DynamicFormButtonTemplate> {
  constructor() {
    super();
  }
}

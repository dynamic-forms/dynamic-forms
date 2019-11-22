import { Component } from '@angular/core';
import { DynamicFormElementWrapper } from '../dynamic-form-element/dynamic-form-element-wrapper';
import { DynamicFormContentTemplate } from './dynamic-form-content-template';

@Component({
  selector: 'dynamic-form-content',
  templateUrl: './dynamic-form-content.component.html'
})
export class DynamicFormContentComponent extends DynamicFormElementWrapper<DynamicFormContentTemplate> {
  constructor() {
    super();
  }

  get content(): string {
    return this.template && this.template.content;
  }
}

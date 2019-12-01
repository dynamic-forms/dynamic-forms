import { Component } from '@angular/core';
import { DynamicFormElementBase } from '../dynamic-form-element-base';
import { DynamicFormContentTemplate } from './dynamic-form-content-template';

@Component({
  selector: 'dynamic-form-content',
  templateUrl: './dynamic-form-content.component.html'
})
export class DynamicFormContentComponent extends DynamicFormElementBase<DynamicFormContentTemplate> {
  constructor() {
    super();
  }

  get content(): string {
    return this.template && this.template.content;
  }
}

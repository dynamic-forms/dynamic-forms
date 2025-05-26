import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicFormElementBase } from '../dynamic-form-element-base';
import { DynamicFormContentDefinition } from './dynamic-form-content-definition';
import { DynamicFormContentTemplate } from './dynamic-form-content-template';

@Component({
  selector: 'dynamic-form-content',
  imports: [NgClass],
  templateUrl: './dynamic-form-content.component.html',
})
export class DynamicFormContentComponent<
  Template extends DynamicFormContentTemplate = DynamicFormContentTemplate,
  Definition extends DynamicFormContentDefinition<Template> = DynamicFormContentDefinition<Template>,
> extends DynamicFormElementBase<Template, Definition> {
  constructor() {
    super();
  }

  get content(): string {
    return this.template?.content;
  }
}

import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicFormElementBase } from '../dynamic-form-element-base';
import { DynamicFormTextDefinition } from './dynamic-form-text-definition';
import { DynamicFormTextTemplate } from './dynamic-form-text-template';

@Component({
  selector: 'dynamic-form-text',
  templateUrl: './dynamic-form-text.component.html',
  imports: [NgClass],
})
export class DynamicFormTextComponent<
  Template extends DynamicFormTextTemplate = DynamicFormTextTemplate,
  Definition extends DynamicFormTextDefinition<Template> = DynamicFormTextDefinition<Template>,
> extends DynamicFormElementBase<Template, Definition> {
  constructor() {
    super();
  }

  get text(): string {
    return this.template?.text;
  }
}

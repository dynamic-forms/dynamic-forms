import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicFormElementBase } from '../dynamic-form-element-base';
import { DynamicFormContentDefinition } from './dynamic-form-content-definition';
import { DynamicFormContentTemplate } from './dynamic-form-content-template';

@Component({
  standalone: true,
  selector: 'dynamic-form-content',
  templateUrl: './dynamic-form-content.component.html',
  imports: [CommonModule],
})
export class DynamicFormContentComponent<
  Template extends DynamicFormContentTemplate = DynamicFormContentTemplate,
  Definition extends DynamicFormContentDefinition<Template> = DynamicFormContentDefinition<Template>
> extends DynamicFormElementBase<Template, Definition> {

  constructor() {
    super();
  }

  get content(): string { return this.template?.content; }
}

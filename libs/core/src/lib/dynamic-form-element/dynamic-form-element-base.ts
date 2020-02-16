import { Input } from '@angular/core';
import { DynamicFormElement } from './dynamic-form-element';
import { DynamicFormElementDefinition } from './dynamic-form-element-definition';
import { DynamicFormElementTemplate } from './dynamic-form-element-template';

export abstract class DynamicFormElementBase<
  Template extends DynamicFormElementTemplate = DynamicFormElementTemplate,
  Definition extends DynamicFormElementDefinition<Template> = DynamicFormElementDefinition<Template>,
  Element extends DynamicFormElement<Template, Definition> = DynamicFormElement<Template, Definition>
> {
  @Input() element: Element;

  get id() { return this.element.id; }

  get definition() { return this.element.definition; }
  get template() { return this.element.template; }
}

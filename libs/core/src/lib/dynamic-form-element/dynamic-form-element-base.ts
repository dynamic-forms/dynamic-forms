import { Directive, Input } from '@angular/core';
import { DynamicFormElement } from './dynamic-form-element';
import { DynamicFormElementDefinition } from './dynamic-form-element-definition';
import { DynamicFormElementTemplate } from './dynamic-form-element-template';

@Directive({})
export abstract class DynamicFormElementBase<
  Template extends DynamicFormElementTemplate = DynamicFormElementTemplate,
  Definition extends DynamicFormElementDefinition<Template> = DynamicFormElementDefinition<Template>,
  Element extends DynamicFormElement<Template, Definition> = DynamicFormElement<Template, Definition>,
> {
  @Input() element: Element;

  get id(): string {
    return this.element.id;
  }

  get hidden(): boolean {
    return this.element.hidden;
  }

  get definition(): Definition {
    return this.element.definition;
  }

  get template(): Template {
    return this.element.template;
  }
}

import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormElementBase } from '../dynamic-form-element-base';
import { DynamicFormElementsComponent } from '../dynamic-form-elements.component';
import { DynamicFormContainerDefinition } from './dynamic-form-container-definition';
import { DynamicFormContainerTemplate } from './dynamic-form-container-template';

@Component({
  standalone: true,
  selector: 'dynamic-form-container',
  templateUrl: './dynamic-form-container.component.html',
  imports: [NgClass, DynamicFormElementsComponent],
})
export class DynamicFormContainerComponent<
  Template extends DynamicFormContainerTemplate = DynamicFormContainerTemplate,
  Definition extends DynamicFormContainerDefinition<Template> = DynamicFormContainerDefinition<Template>,
> extends DynamicFormElementBase<Template, Definition> {
  constructor() {
    super();
  }

  get children(): DynamicFormElement[] {
    return this.element.children;
  }
}

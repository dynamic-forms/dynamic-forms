import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicFormComponentFactory } from '../dynamic-form/dynamic-form-component.factory';
import { DynamicFormElement } from './dynamic-form-element';
import { DynamicFormElementBase } from './dynamic-form-element-base';
import { DynamicFormElementDefinition } from './dynamic-form-element-definition';
import { DynamicFormElementTemplate } from './dynamic-form-element-template';

@Component({
  selector: 'dynamic-form-element',
  templateUrl: './dynamic-form-element.component.html'
})
export class DynamicFormElementComponent<
  Template extends DynamicFormElementTemplate = DynamicFormElementTemplate,
  Definition extends DynamicFormElementDefinition<Template> = DynamicFormElementDefinition<Template>,
  Element extends DynamicFormElement<Template, Definition> = DynamicFormElement<Template, Definition>
> extends DynamicFormElementBase<Template, Definition, Element> implements OnInit {

  @ViewChild('container', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;

  constructor(private componentFactory: DynamicFormComponentFactory) {
    super();
  }

  ngOnInit() {
    this.initContainer();
  }

  get definition() { return this.element.definition; }
  get template() { return this.element.template; }

  private initContainer() {
      this.componentFactory.createComponent(this.container, this.element);
  }
}

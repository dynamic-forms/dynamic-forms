import { ComponentFactory, ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { DynamicFormGroupComponent } from '../dynamic-form-group';
import { DynamicFormArrayComponent } from '../dynamic-form-array';
import { DynamicFormControlComponent } from '../dynamic-form-control';
import { DynamicFormField } from './dynamic-form-field.model';

@Injectable()
export class DynamicFormItemFactory {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  public createComponent(containerRef: ViewContainerRef, field: DynamicFormField) {
    const componentFactory = this.getComponentFactory(field);
    const componentRef = containerRef.createComponent(componentFactory);
    (<any>componentRef.instance).formField = field;
  }

  private getComponentFactory(field: DynamicFormField): ComponentFactory<any> {
    const resolver = this.componentFactoryResolver;
    switch (field.template.type) {
      case 'group':
        return resolver.resolveComponentFactory(DynamicFormGroupComponent);
      case 'array':
        return resolver.resolveComponentFactory(DynamicFormArrayComponent);
      case 'control':
        return resolver.resolveComponentFactory(DynamicFormControlComponent);
    }
  }
}

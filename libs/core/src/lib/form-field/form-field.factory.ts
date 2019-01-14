import { ComponentFactory, ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { FormField } from './form-field.model';
import { FormGroupComponent } from '../form-group';
import { FormArrayComponent } from '../form-array';
import { FormControlComponent } from '../form-control';

@Injectable()
export class FormFieldFactory {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  public createComponent(containerRef: ViewContainerRef, field: FormField) {
    const componentFactory = this.getComponentFactory(field);
    const componentRef = containerRef.createComponent(componentFactory);
    (<any>componentRef.instance).formField = field;
  }

  private getComponentFactory(field: FormField): ComponentFactory<any> {
    const resolver = this.componentFactoryResolver;
    switch (field.template.type) {
      case 'group':
        return resolver.resolveComponentFactory(FormGroupComponent);
      case 'array':
        return resolver.resolveComponentFactory(FormArrayComponent);
      case 'control':
        return resolver.resolveComponentFactory(FormControlComponent);
    }
  }
}

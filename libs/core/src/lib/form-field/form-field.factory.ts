import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { FormField } from './form-field.model';
import { defaultFieldConfig, FormFieldConfig } from './form-field.config';

@Injectable()
export class FormFieldFactory {
  private readonly config: FormFieldConfig = defaultFieldConfig ;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  public createComponent(containerRef: ViewContainerRef, field: FormField): ComponentRef<any> {
    const componentFactory = this.getComponentFactory(field);
    const componentRef = containerRef.createComponent(componentFactory);
    (<any>componentRef.instance).formField = field;
    return componentRef;
  }

  private getComponentFactory(field: FormField): ComponentFactory<any> {
    const resolver = this.componentFactoryResolver;
    const config = this.config.types.find(f => f.type === field.template.type);
    return resolver.resolveComponentFactory(config.component);
  }
}

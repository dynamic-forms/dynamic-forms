import { ComponentFactory, ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { FormField } from './form-field.model';
import { defaultFieldConfig, FormFieldConfig } from './form-field.config';
import { FormFieldComponent } from './form-field.component';

@Injectable()
export class FormFieldFactory {
  private readonly config: FormFieldConfig = defaultFieldConfig ;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  public createComponent(containerRef: ViewContainerRef, field: FormField) {
    const componentFactory = this.getComponentFactory(field);
    const componentRef = containerRef.createComponent(componentFactory);
    componentRef.instance.formField = field;
    return componentRef;
  }

  private getComponentFactory(field: FormField): ComponentFactory<FormFieldComponent> {
    const resolver = this.componentFactoryResolver;
    const config = this.config.types.find(f => f.type === field.template.type);
    return resolver.resolveComponentFactory(config.component);
  }
}

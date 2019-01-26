import { ComponentFactory, ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { FormControlField, FormControlTemplate } from './form-control.model';
import { FormControlConfig, defaultControlConfig } from './form-control.config';
import { FormInputComponent } from './form-input/form-input.component';

@Injectable()
export class FormControlFactory {
  private readonly config: FormControlConfig = defaultControlConfig;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  public createComponent(containerRef: ViewContainerRef, field: FormControlField) {
    const componentFactory = this.getComponentFactory(field);
    const componentRef = containerRef.createComponent(componentFactory);
    componentRef.instance.id = field.path;
    componentRef.instance.input = field.template.input;
    componentRef.instance.control = field.control;
    return componentRef;
  }

  private getComponentFactory(field: FormControlField): ComponentFactory<FormInputComponent> {
    const resolver = this.componentFactoryResolver;
    const controlConfig = this.getControlConfig(field.template);
    return resolver.resolveComponentFactory(controlConfig.component);
  }

  private getControlConfig(template: FormControlTemplate) {
    return this.config.types.find(f => f.type === template.type) || this.config.defaultType;
  }
}

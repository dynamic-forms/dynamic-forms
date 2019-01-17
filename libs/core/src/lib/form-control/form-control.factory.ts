import { ComponentFactory, ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { FormControlConfig, FormControlField, FormControlTemplate } from './form-control.model';
import { FormInputComponent } from '../form-input/form-input.component';

@Injectable()
export class FormControlFactory {
  private readonly defaultControlConfig: FormControlConfig = {
    type: 'input',
    component: FormInputComponent
  };

  private readonly controlConfigs: FormControlConfig[] = [
    this.defaultControlConfig
  ];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  public createComponent(containerRef: ViewContainerRef, field: FormControlField) {
    const componentFactory = this.getComponentFactory(field);
    const componentRef = containerRef.createComponent(componentFactory);
    componentRef.instance.id = field.path;
    componentRef.instance.input = field.template.input;
    componentRef.instance.control = field.control;
  }

  private getComponentFactory(field: FormControlField): ComponentFactory<FormInputComponent> {
    const resolver = this.componentFactoryResolver;
    const controlConfig = this.getControlConfig(field.template);
    return resolver.resolveComponentFactory(controlConfig.component);
  }

  private getControlConfig(template: FormControlTemplate) {
    return this.controlConfigs.find(f => f.type === template.type) || this.defaultControlConfig;
  }
}

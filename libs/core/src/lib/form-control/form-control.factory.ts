import { ComponentFactory, ComponentFactoryResolver, Inject, Injectable, ViewContainerRef } from '@angular/core';
import { FormConfig, FORM_CONFIG } from '../form/form-config';
import { FormControlInputComponent } from './../form-control/form-control-input.component';
import { FormControlField } from './models/form-control-field';

@Injectable()
export class FormControlFactory {
  constructor(
    @Inject(FORM_CONFIG) private formConfig: FormConfig,
    private componentFactoryResolver: ComponentFactoryResolver) {
  }

  public createComponent(containerRef: ViewContainerRef, field: FormControlField) {
    const componentFactory = this.getComponentFactory(field);
    const componentRef = containerRef.createComponent(componentFactory);
    componentRef.instance.id = field.path;
    componentRef.instance.input = field.template.input;
    componentRef.instance.control = field.control;
    return componentRef;
  }

  private getComponentFactory(field: FormControlField): ComponentFactory<FormControlInputComponent> {
    const resolver = this.componentFactoryResolver;
    const controlConfig = this.getControlConfig(field.template.type);
    return resolver.resolveComponentFactory(controlConfig.component);
  }

  private getControlConfig(type: string) {
    const config = this.formConfig.controlConfig;
    return config.types.find(f => f.type === type) || config.defaultType;
  }
}

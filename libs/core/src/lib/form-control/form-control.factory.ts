import { ComponentFactory, ComponentFactoryResolver, Injectable, ViewContainerRef, Inject } from '@angular/core';
import { FormControlField, FormControlTemplate } from './form-control.model';
import { FormControlConfig } from './form-control.config';
import { FormInputComponent } from './form-input/form-input.component';
import { FORM_CONFIG, FormConfig } from '../form/form.config';

@Injectable()
export class FormControlFactory {
  private readonly config: FormControlConfig;

  constructor(@Inject(FORM_CONFIG) formConfig: FormConfig, private componentFactoryResolver: ComponentFactoryResolver) {
    this.config = formConfig.controlConfig;
  }

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

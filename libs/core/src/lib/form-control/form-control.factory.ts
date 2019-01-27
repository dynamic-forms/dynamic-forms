import { ComponentFactory, ComponentFactoryResolver, Injectable, ViewContainerRef, Inject } from '@angular/core';
import { FormControlField, FormControlTemplate } from './form-control.model';
import { FormControlConfig } from './form-control.config';
import { FormInputComponent } from './form-input/form-input.component';
import { FORM_CONFIG, FormConfig } from '../form/form.config';

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

  private getComponentFactory(field: FormControlField): ComponentFactory<FormInputComponent> {
    const resolver = this.componentFactoryResolver;
    const controlConfig = this.getControlConfig(field.template.type);
    return resolver.resolveComponentFactory(controlConfig.component);
  }

  private getControlConfig(type: string) {
    const config = this.formConfig.controlConfig;
    return config.types.find(f => f.type === type) || config.defaultType;
  }
}

import { ComponentFactory, ComponentFactoryResolver, Inject, Injectable, ViewContainerRef } from '@angular/core';
import { FormConfigService } from '../form/form-config.service';
import { FormField } from './form-field';
import { FormFieldBase } from './form-field.base';

@Injectable()
export class FormFieldFactory {
  constructor(
    private formConfigService: FormConfigService,
    private componentFactoryResolver: ComponentFactoryResolver) {}

  public createComponent(containerRef: ViewContainerRef, field: FormField) {
    const componentFactory = this.getComponentFactory(field);
    const componentRef = containerRef.createComponent(componentFactory);
    componentRef.instance.formField = field;
    return componentRef;
  }

  private getComponentFactory(field: FormField): ComponentFactory<FormFieldBase> {
    const resolver = this.componentFactoryResolver;
    const fieldConfig = this.formConfigService.getFieldConfig(field.template.type);
    return resolver.resolveComponentFactory(fieldConfig.component);
  }
}

import { ComponentFactory, ComponentFactoryResolver, Injectable, ViewContainerRef, Inject } from '@angular/core';
import { FormField, FormFieldBase } from './form-field.model';
import { FormFieldConfig } from './form-field.config';
import { FormConfig, FORM_CONFIG } from '../form/form.config';

@Injectable()
export class FormFieldFactory {
  private readonly config: FormFieldConfig;

  constructor(@Inject(FORM_CONFIG) formConfig: FormConfig, private componentFactoryResolver: ComponentFactoryResolver) {
    this.config = formConfig.fieldConfig;
  }

  public createComponent(containerRef: ViewContainerRef, field: FormField) {
    const componentFactory = this.getComponentFactory(field);
    const componentRef = containerRef.createComponent(componentFactory);
    componentRef.instance.formField = field;
    return componentRef;
  }

  private getComponentFactory(field: FormField): ComponentFactory<FormFieldBase> {
    const resolver = this.componentFactoryResolver;
    const config = this.config.types.find(f => f.type === field.template.type);
    return resolver.resolveComponentFactory(config.component);
  }
}

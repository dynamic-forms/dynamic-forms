import { ComponentFactory, ComponentFactoryResolver, Injectable, ViewContainerRef, Inject } from '@angular/core';
import { FormField, FormFieldBase, FormFieldType } from './form-field.model';
import { FORM_CONFIG } from '../form/form.config';
import { FormConfig } from '../form/models/form.config';

@Injectable()
export class FormFieldFactory {
  constructor(
    @Inject(FORM_CONFIG) private formConfig: FormConfig,
    private componentFactoryResolver: ComponentFactoryResolver) {}

  public createComponent(containerRef: ViewContainerRef, field: FormField) {
    const componentFactory = this.getComponentFactory(field);
    const componentRef = containerRef.createComponent(componentFactory);
    componentRef.instance.formField = field;
    return componentRef;
  }

  private getComponentFactory(field: FormField): ComponentFactory<FormFieldBase> {
    const resolver = this.componentFactoryResolver;
    const fieldConfig = this.getFieldConfig(field.template.type);
    return resolver.resolveComponentFactory(fieldConfig.component);
  }

  private getFieldConfig(type: FormFieldType) {
    const config = this.formConfig.fieldConfig;
    return config.types.find(f => f.type === type);
  }
}

import { ComponentFactory, ComponentFactoryResolver, Injectable, Type, ViewContainerRef } from '@angular/core';
import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldBase } from '../dynamic-form-field/dynamic-form-field-base';
import { DynamicFormFieldTypeConfig } from '../dynamic-form-field/dynamic-form-field-config';
import { DynamicFormInputTypeConfig } from '../dynamic-form-input/dynamic-form-input-config';
import { DynamicFormWrapperTypeConfig } from '../dynamic-form-wrapper/dynamic-form-wrapper-config';
import { DynamicFormConfigService } from '../dynamic-form/dynamic-form-config.service';

export type DynamicFormComponentTypeConfig = DynamicFormFieldTypeConfig | DynamicFormInputTypeConfig;

@Injectable()
export class DynamicFormComponentFactory {
  constructor(
    private configService: DynamicFormConfigService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  public createFieldComponent(ref: ViewContainerRef, field: DynamicFormField) {
    const config = this.configService.getFieldTypeConfig(field.template.type);
    return this.createComponent(ref, field, config);
  }

  public createInputComponent(ref: ViewContainerRef, field: DynamicFormControl) {
    const config = this.configService.getInputTypeConfig(field.template.input.type);
    return this.createComponent(ref, field, config);
  }

  private createComponent(ref: ViewContainerRef, field: DynamicFormField, config: DynamicFormComponentTypeConfig) {
    const factory = this.getComponentFactory(config.component);
    const wrapperConfigs = this.getWrapperTypeConfigs(field, config);
    if (wrapperConfigs.length > 0) {
      const wrappers = this.createWrapperComponents(ref, field, wrapperConfigs);
      this.createComponentFromFactory(wrappers.ref, field, factory);
      return wrappers.componentRef;
    }
    return this.createComponentFromFactory(ref, field, factory);
  }

  private getComponentFactory<T>(componentType: Type<T>) {
    const resolver = this.componentFactoryResolver;
    return resolver.resolveComponentFactory(componentType);
  }

  private createComponentFromFactory(ref: ViewContainerRef, field: DynamicFormField, factory: ComponentFactory<DynamicFormFieldBase>) {
    const componentRef = ref.createComponent(factory);
    componentRef.instance.field = field;
    return componentRef;
  }

  private createWrapperComponents(ref: ViewContainerRef, field: DynamicFormField, configs: DynamicFormWrapperTypeConfig[]) {
    const wrappers = { componentRef: null, ref };
    configs.forEach(c => {
      const factory = this.getComponentFactory(c.component);
      const componentRef = wrappers.ref.createComponent(factory);
      componentRef.instance.field = field;
      wrappers.componentRef = wrappers.componentRef || componentRef;
      wrappers.ref = componentRef.instance.ref;
    });
    return wrappers;
  }

  private getWrapperTypeConfigs(field: DynamicFormField, config: DynamicFormComponentTypeConfig) {
    const wrappers = (field.template.wrappers || []).concat(config.wrappers || []);
    return wrappers.map(wrapper => {
      return this.configService.getWrapperTypeConfig(wrapper);
    });
  }
}

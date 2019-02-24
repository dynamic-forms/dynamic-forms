import { ComponentFactoryResolver, Injectable, Type, ViewContainerRef } from '@angular/core';
import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldTypeConfig } from '../dynamic-form-field/dynamic-form-field-config';
import { DynamicFormInputTypeConfig } from '../dynamic-form-input/dynamic-form-input-config';
import { DynamicFormConfigService } from '../dynamic-form/dynamic-form-config.service';

export type DynamicFormComponentTypeConfig = DynamicFormFieldTypeConfig | DynamicFormInputTypeConfig;

@Injectable()
export class DynamicFormComponentFactory {
  constructor(
    private configService: DynamicFormConfigService,
    private componentFactoryResolver: ComponentFactoryResolver) {}

  public createFieldComponent(container: ViewContainerRef, field: DynamicFormField) {
    const config = this.getFieldConfig(field);
    return this.createComponent(container, field, config);
  }

  public createInputComponent(container: ViewContainerRef, field: DynamicFormControl) {
    const config = this.getInputConfig(field);
    return this.createComponent(container, field, config);
  }

  private getFieldConfig(field: DynamicFormField) {
    return this.configService.getFieldConfig(field.template.type);
  }

  private getInputConfig(field: DynamicFormControl) {
    return this.configService.getInputConfig(field.template.input.type);
  }

  private createComponent(container: ViewContainerRef, field: DynamicFormField, config: DynamicFormComponentTypeConfig) {
    const factory = this.getComponentFactory(config.component);
    const wrapper = this.createWrapperComponents(container, field, config);
    const component = (wrapper || container).createComponent(factory);
    component.instance.field = field;
    return component;
  }

  private getComponentFactory<T>(componentType: Type<T>) {
    const resolver = this.componentFactoryResolver;
    return resolver.resolveComponentFactory(componentType);
  }

  private createWrapperComponents(container: ViewContainerRef, field: DynamicFormField, config: DynamicFormComponentTypeConfig) {
    let wrapper = container;
    this.getWrapperConfigs(field, config).forEach(c => {
      const factory = this.getComponentFactory(c.component);
      const component = wrapper.createComponent(factory);
      component.instance.field = field;
      wrapper = component.instance.fieldComponent;
    });
    return wrapper;
  }


  private getWrapperConfigs(field: DynamicFormField, config: DynamicFormComponentTypeConfig) {
    const wrappers = (field.template.wrappers || []).concat(config.wrappers || []);
    return wrappers.map(wrapper => {
      return this.configService.getWrapperConfig(wrapper);
    });
  }
}

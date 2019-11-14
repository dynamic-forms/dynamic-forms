import { ComponentFactory, ComponentFactoryResolver, Injectable, Type, ViewContainerRef } from '@angular/core';
import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormElementTypeConfig } from '../dynamic-form-element/dynamic-form-element-config';
import { DynamicFormElementWrapper } from '../dynamic-form-element/dynamic-form-element-wrapper';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldTypeConfig } from '../dynamic-form-field/dynamic-form-field-config';
import { DynamicFormFieldWrapper} from '../dynamic-form-field/dynamic-form-field-wrapper';
import { DynamicFormInputTypeConfig } from '../dynamic-form-input/dynamic-form-input-config';
import { DynamicFormWrapper } from '../dynamic-form-wrapper/dynamic-form-wrapper';
import { DynamicFormWrapperTypeConfig } from '../dynamic-form-wrapper/dynamic-form-wrapper-config';
import { DynamicFormConfigService } from '../dynamic-form/dynamic-form-config.service';

@Injectable()
export class DynamicFormComponentFactory {
  constructor(
    private configService: DynamicFormConfigService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  createComponent(ref: ViewContainerRef, element: DynamicFormElement) {
    return element.isElement
      ? this.createElementComponent(ref, element)
      : this.createFieldComponent(ref, element as DynamicFormField);
  }

  createElementComponent(ref: ViewContainerRef, element: DynamicFormElement) {
    const config = this.configService.getElementTypeConfig(element.type);
    return this.createElementComponentForConfig(ref, element, config);
  }

  createFieldComponent(ref: ViewContainerRef, field: DynamicFormField) {
    const config = this.configService.getFieldTypeConfig(field.type);
    return this.createFieldComponentForConfig(ref, field, config);
  }

  createInputComponent(ref: ViewContainerRef, field: DynamicFormControl) {
    const config = this.configService.getInputTypeConfig(field.inputType);
    return this.createFieldComponentForConfig(ref, field, config);
  }

  private createElementComponentForConfig(
    ref: ViewContainerRef, element: DynamicFormElement, config: DynamicFormElementTypeConfig
  ) {
    const factory = this.getComponentFactory(config.component);
    return this.createElementComponentFromFactory(ref, element, factory);
  }

  private createFieldComponentForConfig(
    ref: ViewContainerRef, field: DynamicFormField, config: DynamicFormFieldTypeConfig | DynamicFormInputTypeConfig
  ) {
    const factory = this.getComponentFactory(config.component);
    const wrapperConfigs = this.getWrapperTypeConfigs(field, config);
    if (wrapperConfigs.length > 0) {
      const wrapperComponents = this.createWrapperComponents(ref, field, wrapperConfigs);
      const wrapperComponent = wrapperComponents[wrapperComponents.length - 1];
      wrapperComponent.fieldComponent = this.createFieldComponentFromFactory(wrapperComponent.ref, field, factory);
      return wrapperComponents[0];
    }
    return this.createFieldComponentFromFactory(ref, field, factory);
  }

  private getComponentFactory<T>(componentType: Type<T>) {
    const resolver = this.componentFactoryResolver;
    return resolver.resolveComponentFactory(componentType);
  }

  private createElementComponentFromFactory(
    ref: ViewContainerRef, element: DynamicFormElement, factory: ComponentFactory<DynamicFormElementWrapper>
  ) {
    const component = ref.createComponent(factory).instance;
    component.element = element;
    return component;
  }

  private createFieldComponentFromFactory(
    ref: ViewContainerRef, field: DynamicFormField, factory: ComponentFactory<DynamicFormFieldWrapper>
  ) {
    const component = ref.createComponent(factory).instance;
    component.field = field;
    return component;
  }

  private createWrapperComponents(
    ref: ViewContainerRef, field: DynamicFormField, configs: DynamicFormWrapperTypeConfig[]
  ) {
    const wrappers = configs.reduce((result, config) => {
      const factory = this.getComponentFactory(config.component);
      const parentComponent = result[result.length - 1];
      const component = parentComponent.ref.createComponent(factory).instance;
      parentComponent.fieldComponent = component;
      component.field = field;
      return [ ...result, component ];
    }, <DynamicFormWrapper[]>[ { ref: ref } ]);
    return wrappers.slice(1);
  }

  private getWrapperTypeConfigs(
    field: DynamicFormField, config: DynamicFormFieldTypeConfig | DynamicFormInputTypeConfig
  ) {
    const wrappers = (field.wrappers || []).concat(config.wrappers || []);
    return wrappers.map(wrapper => {
      return this.configService.getWrapperTypeConfig(wrapper);
    });
  }
}

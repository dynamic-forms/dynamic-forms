import { ComponentFactory, ComponentFactoryResolver, Injectable, Type, ViewContainerRef } from '@angular/core';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionBase } from '../dynamic-form-action/dynamic-form-action-base';
import { DynamicFormActionType } from '../dynamic-form-action/dynamic-form-action-type';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormElementBase } from '../dynamic-form-element/dynamic-form-element-base';
import { DynamicFormElementType } from '../dynamic-form-element/dynamic-form-element-type';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldBase } from '../dynamic-form-field/dynamic-form-field-base';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormFieldWrapperBase } from '../dynamic-form-field/dynamic-form-field-wrapper-base';
import { DynamicFormFieldWrapperType } from '../dynamic-form-field/dynamic-form-field-wrapper-type';
import { DynamicFormInputType } from '../dynamic-form-input/dynamic-form-input-type';

@Injectable()
export class DynamicFormComponentFactory {
  constructor(
    private configService: DynamicFormConfigService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  createComponent(ref: ViewContainerRef, element: DynamicFormElement) {
    switch (element.classType) {
      case 'element':
        return this.createElementComponent(ref, element);
      case 'field':
        return this.createFieldComponent(ref, element as DynamicFormField);
      case 'action':
        return this.createActionComponent(ref, element as DynamicFormAction);
      default:
        throw Error(`Creating component of class type ${ element.classType } is not supported`);
    }
  }

  createElementComponent(ref: ViewContainerRef, element: DynamicFormElement) {
    const type = this.configService.getElementType(element.componentType);
    return this.createElementComponentForType(ref, element, type);
  }

  createFieldComponent(ref: ViewContainerRef, field: DynamicFormField) {
    const type = this.configService.getFieldType(field.componentType);
    return this.createFieldComponentForType(ref, field, type);
  }

  createActionComponent(ref: ViewContainerRef, action: DynamicFormAction) {
    const type = this.configService.getActionType(action.componentType);
    return this.createActionComponentForType(ref, action, type);
  }

  createInputComponent(ref: ViewContainerRef, field: DynamicFormControl) {
    const type = this.configService.getInputType(field.inputComponentType);
    return this.createFieldComponentForType(ref, field, type);
  }

  private createElementComponentForType(
    ref: ViewContainerRef, element: DynamicFormElement, type: DynamicFormElementType
  ) {
    const factory = this.getComponentFactory(type.component);
    return this.createElementComponentFromFactory(ref, element, factory);
  }

  private createFieldComponentForType(
    ref: ViewContainerRef, field: DynamicFormField, type: DynamicFormFieldType | DynamicFormInputType
  ) {
    const factory = this.getComponentFactory(type.component);
    const wrapperTypes = this.getWrapperTypes(field, type);
    if (wrapperTypes.length > 0) {
      const wrapperComponents = this.createWrapperComponents(ref, field, wrapperTypes);
      const wrapperComponent = wrapperComponents[wrapperComponents.length - 1];
      wrapperComponent.component = this.createFieldComponentFromFactory(wrapperComponent.ref, field, factory);
      return wrapperComponents[0];
    }
    return this.createFieldComponentFromFactory(ref, field, factory);
  }

  private createActionComponentForType(
    ref: ViewContainerRef, action: DynamicFormAction, type: DynamicFormActionType
  ) {
    const factory = this.getComponentFactory(type.component);
    return this.createActionComponentFromFactory(ref, action, factory);
  }

  private getComponentFactory<T>(componentType: Type<T>) {
    const resolver = this.componentFactoryResolver;
    return resolver.resolveComponentFactory(componentType);
  }

  private createElementComponentFromFactory(
    ref: ViewContainerRef, element: DynamicFormElement, factory: ComponentFactory<DynamicFormElementBase>
  ) {
    const component = ref.createComponent(factory).instance;
    component.element = element;
    return component;
  }

  private createFieldComponentFromFactory(
    ref: ViewContainerRef, field: DynamicFormField, factory: ComponentFactory<DynamicFormFieldBase>
  ) {
    const component = ref.createComponent(factory).instance;
    component.field = field;
    return component;
  }

  private createActionComponentFromFactory(
    ref: ViewContainerRef, action: DynamicFormAction, factory: ComponentFactory<DynamicFormActionBase>
  ) {
    const component = ref.createComponent(factory).instance;
    component.action = action;
    return component;
  }

  private createWrapperComponents(
    ref: ViewContainerRef, field: DynamicFormField, types:  DynamicFormFieldWrapperType[]
  ) {
    const wrappers = types.reduce((result, type) => {
      const factory = this.getComponentFactory(type.component);
      const parentComponent = result[result.length - 1];
      const component = parentComponent.ref.createComponent(factory).instance;
      parentComponent.component = component;
      component.field = field;
      return [ ...result, component ];
    }, <DynamicFormFieldWrapperBase[]>[ { ref: ref } ]);
    return wrappers.slice(1);
  }

  private getWrapperTypes(
    field: DynamicFormField, type: DynamicFormFieldType | DynamicFormInputType
  ) {
    const wrappers = (field.wrappers || []).concat(type.wrappers || []);
    return wrappers.map(wrapper => {
      return this.configService.getFieldWrapperType(wrapper);
    });
  }
}

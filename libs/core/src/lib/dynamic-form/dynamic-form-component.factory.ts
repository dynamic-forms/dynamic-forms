import { Injectable, ViewContainerRef } from '@angular/core';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionBase } from '../dynamic-form-action/dynamic-form-action-base';
import { DynamicFormActionType } from '../dynamic-form-action/dynamic-form-action-type';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormElementBase } from '../dynamic-form-element/dynamic-form-element-base';
import { DynamicFormElementType } from '../dynamic-form-element/dynamic-form-element-type';
import { DynamicFormError } from '../dynamic-form-error/dynamic-form-error';
import { DynamicFormErrorType } from '../dynamic-form-error/dynamic-form-error-type';
import { DynamicFormErrorHandler } from '../dynamic-form-error/dynamic-form-error.handler';
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
    private errorHandler: DynamicFormErrorHandler,
  ) {}

  createComponent(ref: ViewContainerRef, element: DynamicFormElement): DynamicFormElementBase | undefined {
    switch (element.classType) {
      case 'element':
        return this.createElementComponent(ref, element);
      case 'field':
        return this.createFieldComponent(ref, element as DynamicFormField);
      case 'action':
        return this.createActionComponent(ref, element as DynamicFormAction);
      default:
        this.handleError(DynamicFormErrorType.ClassType, `Class type ${element.classType} is not defined`);
        return undefined;
    }
  }

  createElementComponent(ref: ViewContainerRef, element: DynamicFormElement): DynamicFormElementBase {
    return this.createElementComponentForType(ref, element, element.type);
  }

  createFieldComponent(ref: ViewContainerRef, field: DynamicFormField): DynamicFormFieldBase {
    return this.createFieldComponentForType(ref, field, field.type);
  }

  createActionComponent(ref: ViewContainerRef, action: DynamicFormAction): DynamicFormActionBase {
    return this.createActionComponentForType(ref, action, action.type);
  }

  createInputComponent(ref: ViewContainerRef, field: DynamicFormControl): DynamicFormFieldBase | undefined {
    const type = this.configService.getInputType(field.inputType);
    if (!type) {
      this.handleError(DynamicFormErrorType.InputType, `Input type ${field.inputType} is not defined`);
      return undefined;
    }
    return this.createFieldComponentForType(ref, field, type, true);
  }

  private createElementComponentForType(
    ref: ViewContainerRef,
    element: DynamicFormElement,
    type: DynamicFormElementType,
  ): DynamicFormElementBase {
    const component = ref.createComponent(type.component).instance;
    component.element = element;
    return component;
  }

  private createFieldComponentForType(
    ref: ViewContainerRef,
    field: DynamicFormField,
    type: DynamicFormFieldType | DynamicFormInputType,
    isInput: boolean = false,
  ): DynamicFormFieldBase {
    const wrapperTypes = this.getWrapperTypes(field, type, isInput);
    if (wrapperTypes.length > 0) {
      const wrapperComponents = this.createWrapperComponents(ref, field, wrapperTypes);
      const wrapperComponent = wrapperComponents[wrapperComponents.length - 1];
      wrapperComponent.component = wrapperComponent.ref.createComponent(type.component).instance;
      wrapperComponent.component.field = field;
      return wrapperComponents[0];
    }
    const component = ref.createComponent(type.component).instance;
    component.field = field;
    return component;
  }

  private createActionComponentForType(
    ref: ViewContainerRef,
    action: DynamicFormAction,
    type: DynamicFormActionType,
  ): DynamicFormActionBase {
    const component = ref.createComponent(type.component).instance;
    component.action = action;
    return component;
  }

  private createWrapperComponents(
    ref: ViewContainerRef,
    field: DynamicFormField,
    types: DynamicFormFieldWrapperType[],
  ): DynamicFormFieldWrapperBase[] {
    const wrappers = types.reduce(
      (result, type) => {
        const parentComponent = result[result.length - 1];
        const component = parentComponent.ref.createComponent(type.component).instance;
        parentComponent.component = component;
        component.field = field;
        return [...result, component];
      },
      [{ ref }] as DynamicFormFieldWrapperBase[],
    );
    return wrappers.slice(1);
  }

  private getWrapperTypes(
    field: DynamicFormField,
    type: DynamicFormFieldType | DynamicFormInputType,
    isInput: boolean,
  ): DynamicFormFieldWrapperType[] {
    const wrappers = !isInput ? (field.wrappers || []).concat(type.wrappers || []) : type.wrappers || [];
    return wrappers
      .map(wrapper => {
        const wrapperType = this.configService.getFieldWrapperType(wrapper);
        if (!wrapperType) {
          this.handleError(DynamicFormErrorType.WrapperType, `Wrapper type ${wrapper} is not defined`);
          return undefined;
        }
        return wrapperType;
      })
      .filter(wrapperType => !!wrapperType);
  }

  private handleError<ErrorType extends DynamicFormErrorType = DynamicFormErrorType>(type: ErrorType, message: string): void {
    this.errorHandler.handle(new DynamicFormError<ErrorType>(type, message));
  }
}

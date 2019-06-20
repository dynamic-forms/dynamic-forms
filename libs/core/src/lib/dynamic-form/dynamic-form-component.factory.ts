import { ComponentFactory, ComponentFactoryResolver, Injectable, Type, ViewContainerRef } from '@angular/core';
import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldTypeConfig } from '../dynamic-form-field/dynamic-form-field-config';
import { DynamicFormFieldWrapper} from '../dynamic-form-field/dynamic-form-field-wrapper';
import { DynamicFormInputTypeConfig } from '../dynamic-form-input/dynamic-form-input-config';
import { DynamicFormWrapper } from '../dynamic-form-wrapper/dynamic-form-wrapper';
import { DynamicFormWrapperTypeConfig } from '../dynamic-form-wrapper/dynamic-form-wrapper-config';
import { DynamicFormConfigService } from '../dynamic-form/dynamic-form-config.service';

export type DynamicFormComponentTypeConfig = DynamicFormFieldTypeConfig | DynamicFormInputTypeConfig;

@Injectable()
export class DynamicFormComponentFactory {
  constructor(
    private configService: DynamicFormConfigService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  createFieldComponent(ref: ViewContainerRef, field: DynamicFormField) {
    const config = this.configService.getFieldTypeConfig(field.definition.type);
    return this.createComponent(ref, field, config);
  }

  createInputComponent(ref: ViewContainerRef, field: DynamicFormControl) {
    const config = this.configService.getInputTypeConfig(field.definition.template.input.type);
    return this.createComponent(ref, field, config);
  }

  private createComponent(ref: ViewContainerRef, field: DynamicFormField, config: DynamicFormComponentTypeConfig) {
    const factory = this.getComponentFactory(config.component);
    const wrapperConfigs = this.getWrapperTypeConfigs(field, config);
    if (wrapperConfigs.length > 0) {
      const wrapperComponents = this.createWrapperComponents(ref, field, wrapperConfigs);
      const wrapperComponent = wrapperComponents[wrapperComponents.length - 1];
      wrapperComponent.fieldComponent = this.createComponentFromFactory(wrapperComponent.ref, field, factory);
      return wrapperComponents[0];
    }
    return this.createComponentFromFactory(ref, field, factory);
  }

  private getComponentFactory<T>(componentType: Type<T>) {
    const resolver = this.componentFactoryResolver;
    return resolver.resolveComponentFactory(componentType);
  }

  private createComponentFromFactory(ref: ViewContainerRef, field: DynamicFormField, factory: ComponentFactory<DynamicFormFieldWrapper>) {
    const component = ref.createComponent(factory).instance;
    component.field = field;
    return component;
  }

  private createWrapperComponents(ref: ViewContainerRef, field: DynamicFormField, configs: DynamicFormWrapperTypeConfig[]) {
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

  private getWrapperTypeConfigs(field: DynamicFormField, config: DynamicFormComponentTypeConfig) {
    const wrappers = (field.definition.wrappers || []).concat(config.wrappers || []);
    return wrappers.map(wrapper => {
      return this.configService.getWrapperTypeConfig(wrapper);
    });
  }
}

import { ComponentFactoryResolver, Injectable, Type, ViewContainerRef } from '@angular/core';
import { FormControlField } from '../form-control/form-control-field';
import { FormField } from '../form-field/form-field';
import { FormFieldTypeConfig } from '../form-field/form-field-config';
import { FormConfigService } from '../form/form-config.service';

@Injectable()
export class FormComponentFactory {
  constructor(
    private formConfigService: FormConfigService,
    private componentFactoryResolver: ComponentFactoryResolver) {}

  public createFieldComponent(container: ViewContainerRef, field: FormField) {
    const config = this.getFieldConfig(field);
    const factory = this.getComponentFactory(config.component);
    const wrapper = this.createWrapperComponents(container, field, config);
    const component = (wrapper || container).createComponent(factory);
    component.instance.formField = field;
    return component;
  }

  public createInputComponent(container: ViewContainerRef, field: FormControlField) {
    const config = this.getInputConfig(field);
    const factory = this.getComponentFactory(config.component);
    const component = container.createComponent(factory);
    component.instance.field = field;
    return component;
  }

  private createWrapperComponents(container: ViewContainerRef, field: FormField, config: FormFieldTypeConfig): ViewContainerRef {
    const configs = this.getWrapperConfigs(field, config);
    return null;
  }

  private getFieldConfig(field: FormField) {
    return this.formConfigService.getFieldConfig(field.template.type);
  }

  private getWrapperConfigs(field: FormField, config: FormFieldTypeConfig) {
    const wrappers = (field.template.wrappers || []).concat(config.wrappers || []);
    return wrappers.map(wrapper => {
      return this.formConfigService.getWrapperConfig(wrapper);
    });
  }

  private getInputConfig(field: FormControlField) {
    return this.formConfigService.getControlConfig(field.template.input.type);
  }

  private getComponentFactory<T>(componentType: Type<T>) {
    const resolver = this.componentFactoryResolver;
    return resolver.resolveComponentFactory(componentType);
  }
}

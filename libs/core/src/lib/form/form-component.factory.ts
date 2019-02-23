import { ComponentFactoryResolver, Injectable, Type, ViewContainerRef } from '@angular/core';
import { FormControlTypeConfig } from '../form-control/form-control-config';
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
    return this.createComponent(container, field, config);
  }

  public createInputComponent(container: ViewContainerRef, field: FormControlField) {
    const config = this.getInputConfig(field);
    return this.createComponent(container, field, config);
  }

  private getFieldConfig(field: FormField) {
    return this.formConfigService.getFieldConfig(field.template.type);
  }

  private getInputConfig(field: FormControlField) {
    return this.formConfigService.getControlConfig(field.template.input.type);
  }

  private createComponent(container: ViewContainerRef, field: FormField, config: FormFieldTypeConfig | FormControlTypeConfig) {
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

  private createWrapperComponents(container: ViewContainerRef, field: FormField, config: FormFieldTypeConfig | FormControlTypeConfig) {
    let wrapper = container;
    this.getWrapperConfigs(field, config).forEach(c => {
      const factory = this.getComponentFactory(c.component);
      const component = wrapper.createComponent(factory);
      component.instance.field = field;
      wrapper = component.instance.fieldComponent;
    });
    return wrapper;
  }


  private getWrapperConfigs(field: FormField, config: FormFieldTypeConfig | FormControlTypeConfig) {
    const wrappers = (field.template.wrappers || []).concat(config.wrappers || []);
    return wrappers.map(wrapper => {
      return this.formConfigService.getWrapperConfig(wrapper);
    });
  }
}

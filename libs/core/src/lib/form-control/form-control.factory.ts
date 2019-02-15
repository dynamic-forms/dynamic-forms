import { ComponentFactory, ComponentFactoryResolver, Inject, Injectable, ViewContainerRef } from '@angular/core';
import { FormConfigService } from '../form/form-config.service';
import { FormControlInputComponent } from './../form-control/form-control-input.component';
import { FormControlField } from './form-control-field';

@Injectable()
export class FormControlFactory {
  constructor(
    private formConfigService: FormConfigService,
    private componentFactoryResolver: ComponentFactoryResolver) {
  }

  public createComponent(containerRef: ViewContainerRef, field: FormControlField) {
    const componentFactory = this.getComponentFactory(field);
    const componentRef = containerRef.createComponent(componentFactory);
    componentRef.instance.field = field;
    return componentRef;
  }

  private getComponentFactory(field: FormControlField): ComponentFactory<FormControlInputComponent> {
    const resolver = this.componentFactoryResolver;
    const controlConfig = this.formConfigService.getControlConfig(field.template.input.type);
    return resolver.resolveComponentFactory(controlConfig.component);
  }
}

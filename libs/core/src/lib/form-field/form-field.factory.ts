import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { FormFieldConfig, FormField } from './form-field.model';
import { FormGroupComponent } from '../form-group/form-group.component';
import { FormArrayComponent } from '../form-array/form-array.component';
import { FormControlComponent } from '../form-control/form-control.component';

@Injectable()
export class FormFieldFactory {
  private readonly fieldConfigs: FormFieldConfig[] = [
    { type: 'group', component: FormGroupComponent },
    { type: 'array', component: FormArrayComponent },
    { type: 'control', component: FormControlComponent }
  ];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  public createComponent(containerRef: ViewContainerRef, field: FormField): ComponentRef<any> {
    const componentFactory = this.getComponentFactory(field);
    const componentRef = containerRef.createComponent(componentFactory);
    (<any>componentRef.instance).formField = field;
    return componentRef;
  }

  private getComponentFactory(field: FormField): ComponentFactory<any> {
    const resolver = this.componentFactoryResolver;
    const fieldConfig = this.fieldConfigs.find(f => f.type === field.template.type);
    return resolver.resolveComponentFactory(fieldConfig.component);
  }
}

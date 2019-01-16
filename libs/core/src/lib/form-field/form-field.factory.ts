import { ComponentFactory, ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { FormFieldConfig, FormField } from './form-field.model';
import { FormGroupComponent } from '../form-group';
import { FormArrayComponent } from '../form-array';
import { FormControlComponent } from '../form-control';

@Injectable()
export class FormFieldFactory {
  private readonly fieldConfigs: FormFieldConfig[] = [
    { type: 'group', component: FormGroupComponent },
    { type: 'array', component: FormArrayComponent },
    { type: 'control', component: FormControlComponent }
  ];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  public createComponent(containerRef: ViewContainerRef, field: FormField) {
    const componentFactory = this.getComponentFactory(field);
    const componentRef = containerRef.createComponent(componentFactory);
    (<any>componentRef.instance).formField = field;
  }

  private getComponentFactory(field: FormField): ComponentFactory<any> {
    const resolver = this.componentFactoryResolver;
    const fieldConfig = this.fieldConfigs.find(f => f.type === field.template.type);
    return resolver.resolveComponentFactory(fieldConfig.component);
  }
}
